const apiKey = "WdHLKEWbHhK2fq5qpjcCak7Ea6YKSP13";
const apiUrl = "https://api.apilayer.com/exchangerates_data/convert";

const monedas = [
    "USD", "EUR", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD", 
    "MXN", "SGD", "HKD", "NOK", "KRW", "TRY", "RUB", "INR", "BRL", "ZAR", "VES"
    // Agrega más códigos de moneda aquí según tus necesidades
]; // Ejemplo de monedas predefinidas

const monedaOrigenSelect = document.getElementById("monedaOrigen");
const monedaDestinoSelect = document.getElementById("monedaDestino");
const cantidadInput = document.getElementById("cantidad");
const convertirBtn = document.getElementById("convertirBtn");
const resultadoDiv = document.getElementById("resultado");

for (const moneda of monedas) {
    const optionOrigen = document.createElement("option");
    const optionDestino = document.createElement("option");
    optionOrigen.value = moneda;
    optionDestino.value = moneda;
    optionOrigen.text = moneda;
    optionDestino.text = moneda;
    monedaOrigenSelect.add(optionOrigen);
    monedaDestinoSelect.add(optionDestino);
}

convertirBtn.addEventListener("click", convertirMoneda);

function convertirMoneda() {
    const monedaOrigen = monedaOrigenSelect.value;
    const monedaDestino = monedaDestinoSelect.value;
    const cantidad = parseFloat(cantidadInput.value);

    const requestOptions = {
        method: 'GET',
        headers: new Headers({
            'apikey': apiKey
        }),
        redirect: 'follow'
    };

    fetch(`${apiUrl}?from=${monedaOrigen}&to=${monedaDestino}&amount=${cantidad}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const montoConvertido = data.result;
            resultadoDiv.textContent = `${cantidad} ${monedaOrigen} son aproximadamente ${montoConvertido} ${monedaDestino}`;
        })
        .catch(error => {
            console.error("Error al realizar la conversión:", error);
        });
}
