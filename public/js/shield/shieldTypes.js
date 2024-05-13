class ShieldTypes {


    static shieldA = {
        soundResourceObject: new ResourceObject({
            category: ResourceObject.CATEGORIES.shield,
            filename: "shield",
            type: ResourceObject.TYPES.wav,
            resourcePath: "/resources/sounds/shield.wav"
        }),

        imageResourceObject : new ResourceObject({
            category : ResourceObject.CATEGORIES.shield,
            name: "shield_sheet_02",
            fileName: "shield_sheet_02",
            fileType : ResourceObject.TYPES.png,
            resourcePath : "/resources/shields/"
        }),
        imageResource: null,
        spriteSheetRows: 4,
        spriteSheetColumns: 8,
        frames: 32,
        strength: 100
    }

    static shieldB = {
        soundResourceObject : new ResourceObject({
            category: ResourceObject.CATEGORIES.shield,
            filename: "shield",
            type: ResourceObject.TYPES.wav,
            resourcePath: "/resources/sounds/shield.wav"
        }),

        imageResourceObject : new ResourceObject({
            category: ResourceObject.CATEGORIES.shield,
            name: "shield_sheet_05",
            fileName: "shield_sheet_05",
            fileType: ResourceObject.TYPES.png,
            resourcePath: "/resources/shields/"
        }),
        imageResource: null,
        spriteSheetRows: 4,
        spriteSheetColumns: 8,
        frames: 32,
        strength: 400
    }
}