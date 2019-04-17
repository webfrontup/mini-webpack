export function addCss(href) {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', href)
    document.getElementsByTagName('head')[0].appendChild(link)
}

export function removeCss(href) {
    const link = document.getElementsByTagName('link')
    for (var i = link.length; i >= 0; i--) {
        if (link[i] && link[i].getAttribute('href') != null && link[i].getAttribute('href').indexOf(href) !== -1) {
            link[i].parentNode.removeChild(link[i])
        }
    }
}