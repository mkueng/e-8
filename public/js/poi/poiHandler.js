class POIHandler {


    static poiHighlightImageResourceObject = new ResourceObject({
        name: "selectCross",
        fileName: "selectCross",
        fileType: ResourceObject.TYPES.png,
        resourcePath: "/resources/poi/"
    })

    static poiHighlightImageResource;

    static POI_TYPES = {
        spaceStation : SpaceStation,
        asteroid : "Asteroid",
        planet : "Planet",
        moon : "Moon",
        base :  "Base"
    }

    #canvasHandler;
    #poiFactory;
    #activePOIs = [];
    #selectedPOI = null;

    constructor() {
        this.#poiFactory = new PoiFactory({resourceHandler});
        e8.global.inputHandler.subscribe(this);
    }

    invoke = async () => {
        POIHandler.poiHighlightImageResource = await e8.global.resourceHandler.fetchImageResource({
            resourceObject: POIHandler.poiHighlightImageResourceObject
        });
        this.poiHighlight = new PoiHighlight({
            image: POIHandler.poiHighlightImageResource.image,
            width: POIHandler.poiHighlightImageResource.image.width,
            height: POIHandler.poiHighlightImageResource.image.height,
            isActive: true,
            identification: "poiHighlight",
            isHittable: false,
            isDestroyable: false,
            canDestroy: false,
            alpha: 0.7,
            canvas: this.#canvasHandler.getCanvas("backgroundFace").canvas,
            posX: 200,
            posY: 200,
            posDX: -20,
            posDY: -75,
            velX: 0,
            velY: 0
        })
        GameObjectsHandler.instance.addGameObject(this.poiHighlight);
    }

    /**
     *
     * @param poiType
     * @param canvas
     * @returns {Promise<*|Poi>}
     */
    createPOI = async ({poi, canvas}) => {
       // console.log("poiType:", poi);
        await this.#poiFactory.invoke(poi.type.imageResourceObject);
        const poiObject = await this.#poiFactory.createPOI({posDX: poi.posDX, posDY:poi.posDY, canvas});
        this.#activePOIs.push(poiObject);
        return poiObject;
    }

    /**
     *
     * @param poi
     */
    destroyPOI = (poi) => {
        this.#activePOIs = this.#activePOIs.filter(activePOI => activePOI !== poi);
    }

    keyEvent = (event, isKeyDown) => {
        if (event === "Tab" && isKeyDown) {
            const currentIndex = this.#activePOIs.indexOf(this.#selectedPOI);
            const nextIndex = (currentIndex + 1) % this.#activePOIs.length;
            this.#selectedPOI = this.#activePOIs[nextIndex];
            console.log("selected POI:", this.#selectedPOI);
            this.poiHighlight.setRelatedPOI(this.#selectedPOI);
        }
    }

}
