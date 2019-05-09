export default (self) => {
    document.addEventListener('keypress', (key) => {
        console.log(key)
        self.F1(key)
    })
}