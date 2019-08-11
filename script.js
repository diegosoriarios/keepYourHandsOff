navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia

const video = document.querySelector("#video")
const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d")
let model

const modelParams = {
    flipHorizontal: true,
    imageScaleFactor: 0.7, 
    maxNumBoxes: 20,       
    iouThreshold: 0.5,     
    scoreThreshold: 0.79,   
}
  

handTrack.startVideo(video).then(status => {
    if(status) {
        navigator.getUserMedia({video: {}}, stream => {
            video.srcObject = stream
            setInterval(runDetection, 1000)
        }, err => console.log(err))
    }
})

runDetection = () => {
    model.detect(video).then(predictions => {
            console.log(predictions)
            model.renderPredictions(predictions, canvas, ctx, video)
            if(predictions.length > 0) {
                console.log('Tira a mão')
            }
        })
}

handTrack.load(modelParams).then(lmodel => {
    model = lmodel
})