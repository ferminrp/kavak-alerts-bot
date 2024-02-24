const url = '';
const telegramToken = ''; // Aca poner el token que te da botfather
const telegramChatId = ''; // Aca poner el telegram chat id

const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;


addEventListener('scheduled', event => {
  event.waitUntil(
    handleScheduled(event.scheduledTime)
  );
});

async function handleScheduled(scheduledTime) {
  console.log("fetching")
  const options = {
    headers: {
      'authority': 'www.kavak.com',
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      'dnt': '1',
      'kavak-client-type': 'web',
      'kavak-country-acronym': 'ar',
      'referer': 'https://www.kavak.com/ar/usados/',
      'sec-ch-ua': '"Chromium";v="121", "Not A(Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    }
  };

  // Realiza la solicitud
  const response = await fetch(url, options);

  // Lee el cuerpo de la respuesta como JSON
  const data = await response.json();

  const cantidadAutos = await data.total;

  const telegramMessage = `Autos disponibles: ${JSON.stringify(cantidadAutos)}`;

  // Prepara la solicitud POST a Telegram
  const telegramResponse = await fetch(telegramUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: telegramChatId,
      text: telegramMessage
    })
  });

  // Verifica si el mensaje se envió correctamente
  const telegramResult = await telegramResponse.json();
  if (!telegramResult.ok) {
    console.error('Error sending Telegram message', telegramResult);
  }

  // Ahora puedes hacer console.log del contenido JSON
  console.log(cantidadAutos);

  // Devuelve la respuesta
  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: response.headers
  });
}
