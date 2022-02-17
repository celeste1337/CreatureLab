import React from "react";


class GalleryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.images = require.context('../../public/test-game', true);
    }

    
}
