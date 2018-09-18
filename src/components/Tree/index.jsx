import React from 'react'
import tree_hasFruit from '../../public/images/tree_hasfruit.png'
import tree_noFruit from '../../public/images/tree_nofruit.png'
import {simpleStoreContract} from '../../contracts/bitmonkey'

require('./tree.css')

const pic = '../../public/images/pic.jpg'

// const Fruit = () => {
//     return (
//         <div className="fruit-bg">
//             fruits
//         </div>
//     )
// }

class Tree extends React.Component {
    state = {
        fruits: this.props.fruits
    }
    componentDidMount() {
        // let FruitData = this.getFruitData()
        // this.setState({
        //     fruits:FruitData
        // })
    }




    render() {
        return (
            <div>
                <img className="bg_tree" src={this.props.data == 0 ? tree_noFruit : tree_hasFruit} onClick={this.props.data == 0 ? null : this.props.onClick}/>
            </div>
        )
    }
}

export default Tree
