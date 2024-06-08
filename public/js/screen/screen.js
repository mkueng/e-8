class Screen {
    constructor() {
    }

    init(){
        e8.global.inputHandler.subscribe(this);
    }


    keyEvent = (event, isKeyDown) => {

        if (isKeyDown){
            switch (event) {
                case "KeyS":



                    break;
                case "KeyW":


                    break;
                case "KeyA":

                    break;
                case "KeyD":

                    break;
            }
        } else {

        }
    }

}