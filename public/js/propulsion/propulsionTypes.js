class PropulsionTypes {

    #rootPath = '/propulsion/';


    static ionA = {
        imageResource : {
            category : ResourceObject.CATEGORIES.propulsion,
            name: "propulsionSpriteSheet_01",
            fileName: "propulsionSpriteSheet_01",
            fileType : ResourceObject.TYPES.png,
            resourcePath : "/resources/propulsion/propulsion_01/images/"
        },
        spriteSheetRows: 7,
        spriteSheetColumns: 1,
        animationLoop: true,
        frames: 7,

        step: 50,
        efficiency: 0.5,
        fuelType: FuelFactory.FUEL_TYPES.xenon,
    }

    static ionB = {
        imageResource: {
            category: ResourceObject.CATEGORIES.propulsion,
            name: "propulsionSpriteSheet_01",
            fileName: "propulsionSpriteSheet_01",
            fileType: ResourceObject.TYPES.png,
            resourcePath: "/resources/propulsion/propulsion_01/images/"
        },
        spriteSheetRows: 7,
        spriteSheetColumns: 1,
        animationLoop: true,
        frames: 7,

        step: 50,

        efficiency: 0.5,
        fuelType: FuelFactory.FUEL_TYPES.xenon
    }

    static ionC = {
        imageResource: {
            category: ResourceObject.CATEGORIES.propulsion,
            name: "propulsion_03",
            fileName: "propulsion_03",
            fileType: ResourceObject.TYPES.png,
            resourcePath: "/resources/propulsion/propulsion_03/"
        },
        spriteSheetRows: 6,
        spriteSheetColumns: 1,
        animationLoop: true,
        frames: 6,
        step: 50,

        efficiency: 0.5,
        fuelType: FuelFactory.FUEL_TYPES.xenon
    }
}