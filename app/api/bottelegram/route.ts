// import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";
// import FormData from "form-data";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { chatId, caption, base64Image } = body;

//     if (!chatId) {
//       return NextResponse.json({ error: "chatId is required" }, { status: 400 });
//     }

//     const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
//     if (!telegramToken) {
//       return NextResponse.json({ error: "Bot token is not set" }, { status: 500 });
//     }

//     // ---- ارسال عکس Base64 ----
//     if (base64Image) {
//       const buffer = Buffer.from(base64Image, "base64");

//       const form = new FormData();
//       form.append("chat_id", chatId);
//       form.append("caption", caption || "");
//       form.append("photo", buffer, {
//         filename: "photo.jpg",
//         contentType: "image/jpeg",
//       });

//       const response = await axios.post(
//         `https://api.telegram.org/bot${telegramToken}/sendPhoto`,
//         form,
//         { headers: form.getHeaders() }
//       );

//       return NextResponse.json(response.data);
//     }

//     // ---- ارسال متن ساده ----
//     if (caption) {
//       const response = await axios.post(
//         `https://api.telegram.org/bot${telegramToken}/sendMessage`,
//         { chat_id: chatId, text: caption }
//       );

//       return NextResponse.json(response.data);
//     }

//     return NextResponse.json({ error: "Nothing to send" }, { status: 400 });
//   } catch (error: any) {
//     console.error(error.response?.data || error.message);
//     return NextResponse.json({ error: "Failed to send message or photo" }, { status: 500 });
//   }
// }
////////////////////////////////////////////////////////////////////////////
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

// تبدیل URL عکس به Base64
async function imageUrlToBase64(imageUrl: string): Promise<string> {
  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const buffer = Buffer.from(response.data, "binary");
  return buffer.toString("base64");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { chatId, caption, base64Image, imageUrl } = body;

    if (!chatId) {
      return NextResponse.json(
        { error: "chatId is required" },
        { status: 400 }
      );
    }

    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!telegramToken) {
      return NextResponse.json(
        { error: "Bot token is not set" },
        { status: 500 }
      );
    }

    let finalBase64 = base64Image;

    // اگر URL داده شده و Base64 موجود نیست، تبدیل URL به Base64
    if (imageUrl && !base64Image) {
      finalBase64 = await imageUrlToBase64(imageUrl);
    }

    // ---- ارسال عکس Base64 ----
    if (finalBase64) {
      const buffer = Buffer.from(finalBase64, "base64");

      const form = new FormData();
      form.append("chat_id", chatId);
      form.append("caption", caption || "");
      form.append("photo", buffer, {
        filename: "photo.jpg",
        contentType: "image/jpeg",
      });

      const response = await axios.post(
        `https://api.telegram.org/bot${telegramToken}/sendPhoto`,
        form,
        { headers: form.getHeaders() }
      );

      return NextResponse.json(response.data);
    }

    // ---- ارسال متن ساده ----
    if (caption) {
      console.log(telegramToken);
      const response = await axios.post(
        `https://api.telegram.org/bot${telegramToken}/sendMessage`,
        { chat_id: chatId, text: caption }
      );

      return NextResponse.json(response.data);
    }

    return NextResponse.json({ error: "Nothing to send" }, { status: 400 });
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to send message or photo" },
      { status: 500 }
    );
  }
}
