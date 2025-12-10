class CardManager {
    flippedCards = new Set()
    urlFactory
    constructor(factory){
        this.urlFactory = factory
    }
    gen(heroNumber){
        let template = document.getElementById("cardTemplate")
        let clone = template.content.cloneNode(true)
        let img = clone.querySelector('img')
        img.setAttribute('src', this.urlFactory(heroNumber))
        clone.children[0].addEventListener('click', event=> this.onClick(event))
        return clone
    }
    onClick(event){
        console.log(this.flippedCards)
        if (this.flippedCards.size == 2) {
            console.log("CAi no if do onclick")
            this.endTurn()
        } else {
            this.flip(event.target)
        }
    }
    flip(cardNode){
        console.log("Chamei aqui")
        cardNode.children[0].classList.add('selected')  
        this.flippedCards.add(cardNode)    
    }
    unFlip(cardNode){
        cardNode.children[0].classList.remove('selected')
    }
    disable(cardNode){
        cardNode.children[0].classList.add('matched')
        this.unFlip(cardNode)
    }
    check(){
        let urls =[...this.flippedCards].map((card) => {
            return card.querySelector('img').src
        })
        return urls[0] == urls[1]
    }
    endTurn(){
        let handler = this.check() ? (card) => this.disable(card): this.unFlip
         console.log("AAAAA")
        this.flippedCards.forEach(handler)
        this.flippedCards.clear()
    }
}