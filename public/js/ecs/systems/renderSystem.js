class RenderSystem extends System{
  constructor() {
    super(['entity', 'interpolation']);
  }

  update = () =>{
    console.log("render System ");
  }

}