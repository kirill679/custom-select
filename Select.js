class Select extends HTMLElement {
  connectedCallback () {
    let options = this.getAttribute('options') || ''
    // Convert options string to array, remove duplicate values, trim too long options
    options = options.
      split(', ').
      filter((o, i, a) => a.indexOf(o) === i).
      map(
        o => o.length > 15
          ? o.substring(0, Math.min(o.length, 15)) + '...'
          : o)

    const lowercaseOptions = options.map(o => o.toLowerCase())

    let value = this.getAttribute('value') || ''
    value = value.toLowerCase()
    value = lowercaseOptions.includes(value) ? value : lowercaseOptions[0]
    this.setAttribute('value', value)

    const selectedIdx = lowercaseOptions.findIndex(o => o === value)
    let selected = options[selectedIdx]

    // Hide options if clicked outside the Select
    function outsideClickHandler (e) {
      const $select = this
      if (!$select.contains(e.target)) {
        this.querySelector('.options').classList.add('hidden')
      }
    }

    function showOrHideOptions () {
      this.querySelector('.options').classList.toggle('hidden')

      if (!this.querySelector('.options').classList.contains('hidden')) {
        document.addEventListener('click', outsideClickHandler.bind(this),
          { capture: true, once: true })
      }
    }

    // Checks if it's valid CSS color
    function isValidColor (color) {
      const option = new Option()
      option.style.color = color
      return option.style.color !== ''
    }

    let bgColor = this.getAttribute('bg')
    bgColor = isValidColor(bgColor) ? bgColor : '#3399ff'

    let textColor = this.getAttribute('color')
    textColor = isValidColor(textColor) ? textColor : '#fff'

    // Render Select
    this.innerHTML = `
    <div class="selected-wrapper">
      <div class="selected">${selected}</div>
      <div class="arrow-down"></div>
    </div class="selected-wrapper">
    <div class="options hidden">
      ${options.map(o => `<div class="${o === selected
      ? 'option same'
      : 'option'}">${o}</div>`).join('')}
    </div>
    `

    // Custom Select styles
    this.querySelector('.options').style.backgroundColor = bgColor
    this.querySelector('.options').style.color = textColor
    this.querySelector('.selected').style.backgroundColor = bgColor
    this.querySelector('.selected').style.color = textColor
    this.querySelector('.arrow-down').style.borderColor = textColor +
      ' transparent transparent transparent'

    // Show options
    this.querySelectorAll('.selected, .arrow-down').
      forEach(
        el => el.addEventListener('click', showOrHideOptions.bind(this)))

    // Select option
    this.querySelectorAll('.option').
      forEach(o => o.addEventListener('click', () => {
        const el = o.innerText
        const idx = options.findIndex((o) => o === el)

        selected = options[idx]
        value = options[idx].toLowerCase()

        this.setAttribute('value', value)
        this.querySelector('.selected').innerText = selected

        this.querySelector('.same').classList.remove('same')
        o.classList.add('same')

        showOrHideOptions.call(this)

        this.dispatchEvent(new CustomEvent('select', { detail: value }))
      }))
  }
}

customElements.define('my-select', Select)
