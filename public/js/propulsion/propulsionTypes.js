class PropulsionTypes {

    #rootPath = '/propulsion/';

    /**
     *
     * @type {{imageResourceObject: ResourceObject, imageResource: null, efficiency: number, frames: number, fuelType: Xenon, animationLoop: boolean, spriteSheetColumns: number, spriteSheetRows: number}}
     */
    static throttle = {
        imageResourceObject : new ResourceObject({
            category : ResourceObject.CATEGORIES.propulsion,
            name: "throttle",
            fileName: "throttle",
            fileType : ResourceObject.TYPES.png,
            resourcePath : "/resources/propulsion/propulsion_05/images/"
        }),
        imageResource: null,
        spriteSheetRows: 17,
        spriteSheetColumns: 1,
        animationLoop: false,
        frames: 17,
        efficiency: 0.5,
        fuelType: FuelFactory.FUEL_TYPES.xenon,
    }

    /**
     *
     * @type {{imageResourceObject: ResourceObject, imageResource: null, efficiency: number, frames: number, fuelType: Xenon, animationLoop: boolean, spriteSheetColumns: number, spriteSheetRows: number}}
     */
    static spinner = {
        imageResourceObject : new ResourceObject({
            category : ResourceObject.CATEGORIES.propulsion,
            name: "spinner",
            fileName: "spinner",
            fileType : ResourceObject.TYPES.png,
            resourcePath : "/resources/propulsion/propulsion_04/images/"
        }),
        imageResource: null,
        spriteSheetRows: 16,
        spriteSheetColumns: 1,
        animationLoop: true,
        frames: 16,
        efficiency: 0.5,
        fuelType: FuelFactory.FUEL_TYPES.xenon,
    }

    /**
     *
     * @type {{imageResourceObject: ResourceObject, imageResource: null, efficiency: number, frames: number, fuelType: Xenon, animationLoop: boolean, spriteSheetColumns: number, spriteSheetRows: number}}
     */
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

    /**
     *
     * @type {{imageResourceObject: ResourceObject, imageResource: null, efficiency: number, frames: number, fuelType: Xenon, animationLoop: boolean, spriteSheetColumns: number, spriteSheetRows: number}}
     */
    static ionB = {
        imageResourceObject : new ResourceObject({
            category : ResourceObject.CATEGORIES.propulsion,
            name: "propulsionSpriteSheet_02",
            fileName: "propulsionSpriteSheet_02",
            fileType : ResourceObject.TYPES.png,
            resourcePath : "/resources/propulsion/propulsion_02/images/"
        }),
        imageResource: null,
        spriteSheetRows: 8,
        spriteSheetColumns: 1,
        animationLoop: true,
        frames: 8,
        efficiency: 0.5,
        fuelType: FuelFactory.FUEL_TYPES.xenon
    }

    /**
     *
     * @type {{imageResourceObject: ResourceObject, imageResource: null, efficiency: number, frames: number, fuelType: Xenon, animationLoop: boolean, spriteSheetColumns: number, spriteSheetRows: number}}
     */
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
        animationLoop: false,
        frames: 6,
        efficiency: 0.5,
        fuelType: FuelFactory.FUEL_TYPES.xenon
    }
}