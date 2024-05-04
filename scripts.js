
const CURRENCIES_RATIO = {
  'USD': {price: 4.87, prefix: 'US$'},
  'EUR': {price: 5.32, prefix: '€'},
  'GBP': {price: 6.08, prefix: '£'}
};

const formElement = document.querySelector('main > form')
const amountElement = document.getElementById('amount')
const currencyElement = document.getElementById('currency')

const footerElement = document.querySelector('main > footer')
const descriptionElement = document.getElementById('description')
const resultElement = document.getElementById('result')

amountElement.addEventListener('input', () => {
  const nonNumericCharsRegex = /\D+/g

  amountElement.value = amountElement.value.replace(nonNumericCharsRegex, '')
})

formElement.onsubmit = (event) => {
  event.preventDefault()

  const amount = amountElement.value
  const currency = currencyElement.value

  convertCurrency(amount, CURRENCIES_RATIO[currency].price, CURRENCIES_RATIO[currency].prefix)
}

/**
 * Converts a given amount of currency to another currency based on the price.
 *
 * @param {number} amount - The amount of currency to convert.
 * @param {number} price - The price of the currency to convert to.
 * @param {string} prefix - The prefix to display before the conversion rate.
 */
function convertCurrency(amount, price, prefix) {
  try {
    descriptionElement.textContent = `${prefix} 1 = ${formatCurrencyBRL(price)}`

    const total = (amount * price).toFixed(2).replace('.', ',')

    resultElement.textContent = `${total} Reais`

    footerElement.classList.add('show-result')
  } catch (error) {
    console.log(error)

    footerElement.classList.remove('show-result')
  }
}

/**
 * Formats a numeric value as a currency string in Brazilian Real (BRL) format.
 *
 * @param {number} value - The numeric value to be formatted.
 * @returns {string} The formatted currency string.
 */
function formatCurrencyBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}