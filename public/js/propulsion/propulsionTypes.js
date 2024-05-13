class PropulsionTypes {

    #rootPath = '/propulsion/';


    static ionA = {
        imageResourceObject : new ResourceObject({
            category : ResourceObject.CATEGORIES.propulsion,
            name: "propulsionSpriteSheet_01",
            fileName: "propulsionSpriteSheet_01",
            fileType : ResourceObject.TYPES.png,
            resourcePath : "/resources/propulsion/propulsion_01/images/"
        }),
        imageResource: null,
        spriteSheetRows: 8,
        spriteSheetColumns: 1,
        animationLoop: true,
        frames: 8,
        efficiency: 0.5,
        fuelType: FuelFactory.FUEL_TYPES.xenon,
    }

    static ionB = {
        imageResourceObject : new ResourceObject({
            category : ResourceObject.CATEGORIES.propulsion,
            name: "propulsionSpriteSheet_01",
            fileName: "propulsionSpriteSheet_01",
            fileType : ResourceObject.TYPES.png,
            resourcePath : "/resources/propulsion/propulsion_01/images/"
        }),
        imageResource: null,
        spriteSheetRows: 7,
        spriteSheetColumns: 1,
        animationLoop: true,
        frames: 7,
        efficiency: 0.5,
        fuelType: FuelFactory.FUEL_TYPES.xenon
    }

    static ionC = {
        imageResourceObject: new ResourceObject({
            category: ResourceObject.CATEGORIES.propulsion,
            name: "propulsion_03",
            fileName: "propulsion_03",
            fileType: ResourceObject.TYPES.png,
            resourcePath: "/resources/propulsion/propulsion_03/"
        }),
        imageResource: null,
        spriteSheetRows: 6,
        spriteSheetColumns: 1,
        animationLoop: true,
        frames: 6,
        efficiency: 0.5,
        fuelType: FuelFactory.FUEL_TYPES.xenon
    }
}