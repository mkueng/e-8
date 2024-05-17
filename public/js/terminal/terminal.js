class Terminal {

    static imageResourceObject = new ResourceObject({
        name:"terminal",
        fileName:"terminal",
        fileType:ResourceObject.TYPES.png,
        resourcePath:"/resources/terminal/"
    })

    static imageResource;

    constructor(resourceHandler, canvasHandler){
        this.resourceHandler = resourceHandler;
        this.canvasHandler = canvasHandler;
        this.terminalCanvas = this.canvasHandler.getCanvas("terminal").canvas;
        this.terminalContext = this.canvasHandler.getCanvas("terminal").context;
        //this.terminalContext.globalAlpha= 0.2;
        this.terminalContentCanvas = this.canvasHandler.getCanvas("terminalContent").canvas;
        this.terminalContentContext = this.canvasHandler.getCanvas("terminalContent").context;
        this.terminalContentContext.imageSmoothingEnabled = false;
        this.terminalContentContext.font = "20px myFont";
        this.terminalContentContext.fillStyle = "grey";
        this.terminalContentContext.globalAlpha= 0.5;
    }

    invoke = async ()=>{
        Terminal.imageResource = await this.resourceHandler.fetchImageResource({
            resourceObject: Terminal.imageResourceObject
        });
        this.showTerminal();
        this.renderTopLeftCompartment();
        this.renderTopRightCompartment();
        this.renderBottomLeftCompartment();
        this.renderBottomRightCompartment();
        this.applyCRTScreenEffect();

    }

    showTerminal=()=>{
        this.terminalContext.drawImage(Terminal.imageResource.image, 0, 0, this.terminalCanvas.width, this.terminalCanvas.height)
    }

    renderTopLeftCompartment=()=>{
        console.log( this.terminalContentCanvas);
        console.log( this.terminalContext);
        this.terminalContentContext.fillStyle = "lightgreen";
        //this.context.fillRect(100, 90, this.canvas.width/2-100, this.canvas.height/2-70);
        //this.terminalContentContext.globalAlpha= 0.5;
        this.terminalContentContext.fillText("Terminal", 150, 150);

    }

    renderTopRightCompartment=()=>{
        this.terminalContentContext.fillStyle = "white";
        this.terminalContentContext.fillRect(this.terminalContentCanvas.width/2, 90, this.terminalContentCanvas.width/2-100, this.terminalContentCanvas.height/2-70);
    }

    renderBottomLeftCompartment=()=>{
        this.terminalContentContext.fillStyle = "blue";
        this.terminalContentContext.fillRect(100, this.terminalContentCanvas.height/2+20, this.terminalContentCanvas.width/2-100, this.terminalContentCanvas.height/2-80);
    }

    renderBottomRightCompartment=()=>{
        this.terminalContentContext.fillStyle = "green";
        this.terminalContentContext.fillRect(this.terminalContentCanvas.width/2, this.terminalContentCanvas.height/2+20, this.terminalContentCanvas.width/2-100, this.terminalContentCanvas.height/2-80);
    }

    applyCRTScreenEffect=()=> {
        const canvas = this.terminalContentCanvas;
        const ctx = this.terminalContentContext;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const width = canvas.width;
        const height = canvas.height;

        const distortedData = new Uint8ClampedArray(data.length);

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(centerX, centerY);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const dx = (x - centerX) / radius;
                const dy = (y - centerY) / radius;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Apply a convex distortion
                const factor = 1 + distance * distance * 0.1;
                const srcX = Math.round(centerX + dx * radius * factor);
                const srcY = Math.round(centerY + dy * radius * factor);

                if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
                    const srcIndex = (srcY * width + srcX) * 4;
                    const destIndex = (y * width + x) * 4;
                    distortedData[destIndex] = data[srcIndex];
                    distortedData[destIndex + 1] = data[srcIndex + 1];
                    distortedData[destIndex + 2] = data[srcIndex + 2];
                    distortedData[destIndex + 3] = data[srcIndex + 3];
                }
            }



            // Put distorted data back to canvas
            const outputImageData = new ImageData(distortedData, width, height);
            ctx.putImageData(outputImageData, 0, 0);
        }
    }


    hideTerminal=()=>{

    }

}