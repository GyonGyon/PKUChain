import React from 'react'


import bagModalStyle  from '../../config/modalStyle'
import pic from '../../public/images/pic.jpg'
import bag from '../../public/images/bag.png'
import goods0 from '../../public/images/goods0.png'
import goods1 from '../../public/images/goods1.png'
import goods2 from '../../public/images/goods2.png'
import goods3 from '../../public/images/goods3.png'
import goods4 from '../../public/images/goods4.png'
import Modal from 'react-modal';
import {simpleStoreContract} from '../../contracts/bitmonkey'


require('./bag.css')


const Thing = ({thingPic}) => {
    // console.log(thingPic)
    return (
        <div className="thing-bg">
            <img src={thingPic} />
        </div>
    )
}

class Bag extends React.Component {
    constructor() {
        super();
        this.state = {
            times: [],
            texts: [],
            modalIsOpen: false,
            goodsPics: [goods0]
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submitBag = this.submitBag.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    submitBag(){
        // const from = 'e3fba7efa7e9b68b18c31f42b41c2dff7dc69b0c'
        //
        // var times=[]
        // for(let i = 0;i < 10; i++){
        //     times.push(new Date())
        // }
        // console.log(times)
        // Promise.all(times.map(time => simpleStoreContract.methods.get(time).call({ from })))
        //     .then(texts => {
        //         this.setState({ texts })
        //         console.log(texts)
        //     })
        //     .catch(console.error)
        this.closeModal()
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <img src={bag} className="bag-button" onClick={this.openModal} />
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={bagModalStyle}
                    contentLabel=""
                >

                    <div className="bag-bg">
                        <div className="thing-container">
                    {this.state.goodsPics.map((thingPic, idx) => (
                        <Thing
                            thingPic={thingPic}/>
                    ))}
                        </div>
                    <button onClick={this.submitBag}>close</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Bag
