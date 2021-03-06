import React from 'react'
import logo from '../../public/images/logo.svg'
import bg from '../../public/images/bg.png'

import bed from '../../public/images/bed.png'
import end from '../../public/images/end.jpg'
import frontbg from '../../public/images/frontbg.png'
import pc from '../../public/images/pc.png'
import quiet from '../../public/images/quilt.png'

// import bg from "../../public/images/bg.png"

import PicWall from '../../components/PicWall'
import Bed from '../../components/Bed'
import Monkey from '../../components/Monkey'
import Header from '../../components/Header'
import Tree from '../../components/Tree'
import Market from '../../components/Market'
import Bag from '../../components/Bag'
import Wallet from '../../components/Wallet'
import Quilt from '../../components/Quilt'
import PC from '../../components/PC'
import Modal from 'react-modal'

import './home.css'

import { transaction, bitmonkeyContract } from '../../contracts/bitmonkey'

import nervos from '../../config/nervos'
// import $ from 'jQuery'
import axios from 'axios'

const from = '9b408a683b284fd3dae967bfe50528b0983c4865'

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasLogin: false, //有无猴
      monkey: [], //猴子状态
      fruits: 0, //钱
      treeFruits: 30, //树上钱
      bag: [], //背包
      picWall: [], //照片墙
      market: [], //商店
      marketData: [], //商店数据
      Screen: PC, //电脑图片
      picArray: [], //照片墙图片序号
      picArrayy: [], //照片墙图片序号
      monkeyClass: false,
      where: 2,
      status: [1, 0, 1],
      i: 0,
    }
  }

  componentDidMount() {
    this.checkLoginStatus()
    if (this.state.hasLogin) {
      this.loadData()
    }
  }

  loadData() {
    // this.checkLoginStatus();
    // this.getMonkey();
    this.getStore()
    this.getOneProducts()
    this.getOnePictures()
    // setTimeout(this.walkOut(),20000)
    this.finalPicture()

    setTimeout(() => {
      setInterval(() => this.getStatus(), 5000)
    }, 20000)
  }

  getStatus() {
    console.log('getStatus', {
      address: from,
      randombackground: this.state.status[0],
      randomanimals: this.state.status[1],
      state: this.state.status[2],
      timestamp: Math.round(new Date().getTime() / 1000).toString(),
    })
    axios
      .post('http://123.207.75.151:9996/bitrun/api/v1/story_happen', {
        address: from,
        randombackground: this.state.status[0],
        randomanimals: this.state.status[1],
        state: this.state.status[2],
        timestamp: (60 + Math.round(new Date().getTime() / 1000)).toString(),
      })
      .then((res) => {
        console.log('getStatus', res)

        var status = this.state.status
        var monkey = this.state.monkey

        status[2] = res.data.status
        monkey[3] = res.data.status

        this.setState({ monkey: monkey, status: status })
      })
    // axios.get('http://123.207.75.151:9996/bitrun/api/v1/get_monkey_status/'+from)
    //     .then((res) => {
    //     console.log("check", res);
    //     if(res.data.pic_url){
    //
    //         var newPic = res.data.pic_url
    //         var picArray = this.state.picArray
    //         picArray.push(newPic)
    //         this.setState({picArray})
    //     }
    //
    // })
    var newpicarr = [
      'https://yimixiaoyuan.top/4-1-2.jpg',
      'https://yimixiaoyuan.top/2-1-2-1.jpg',
      'https://yimixiaoyuan.top/2-1-2-4.jpg',
      'https://yimixiaoyuan.top/3-2-1-1.jpg',
      'https://yimixiaoyuan.top/2-1-2.jpg',
    ]
    var i = this.state.i
    var newPic = newpicarr[i]
    i++
    if (i == 5) i = 0
    this.setState({ i: i })
    var picArrayy = this.state.picArrayy
    picArrayy.push(newPic)
    this.setState({ picArrayy })
  }

  // getMonkey() {
  //     bitmonkeyContract.methods
  //         .getMonkey()
  //         .call({
  //             from,
  //         })
  //         .then(monkey => {
  //             console.log("getMonkey", monkey)
  //             if (monkey) {
  //                 this.setState({
  //                     monkey: monkey,
  //                     mood: monkey[1],
  //                     fruits: monkey[2]
  //                 })
  //
  //                 console.log(this.state.monkey) //名字 心情 钱 照片墙状态
  //             }
  //             // return Promise.all(times.map(time => bitmonkeyContract.methods.get(time).call({ from })))
  //         })
  //         .catch(console.error)
  //     this.loadData()
  //
  // }

  getStore() {
    var storePics = []
    axios
      .get('http://123.207.75.151:9996/bitrun/api/v1/get_goods')
      .then((res) => {
        console.log(res)
        return res.data
      })
      .then((res) => {
        for (var i = 0; i < 5; i++) {
          bitmonkeyContract.methods
            .getStore(i)
            .call({
              from,
            })
            .then((goods) => {
              console.log('getgoods', goods)
              if (goods) {
                var market = this.state.marketData
                console.log('market:', market)
                goods[3] = res[goods[0]]
                market.push(goods)
                this.setState({ marketData: market })
                console.log('marketData:', this.state.marketData)
              }
              // return Promise.all(times.map(time => bitmonkeyContract.methods.get(time).call({ from })))
            })
            // .then(texts => {
            //     this.setState({ texts })
            // })
            .catch(console.error)
        }
      })
  }

  getOneProducts() {
    bitmonkeyContract.methods
      .getOneProducts()
      .call({
        from,
      })
      .then((goods) => {
        console.log('store have', goods)
        if (goods) {
          var market = this.state.market
          console.log('market:', market)
          market.push(goods)
          this.setState({ market })
          console.log(this.state.market)
        }
        // return Promise.all(times.map(time => bitmonkeyContract.methods.get(time).call({ from })))
      })
      // .then(texts => {
      //     this.setState({ texts })
      // })
      .catch(console.error)
  }

  buyProduct(i) {
    nervos.appchain
      .getBlockNumber()
      .then((current) => {
        const tx = {
          ...transaction,
          validUntilBlock: +current + 88,
        }
        console.log('buyProduct---res')
        return bitmonkeyContract.methods.buyProduct(i).send(tx)
      })
      .then((res) => {
        this.setState({
          fruits: this.state.fruits - 2,
          monkeyClass: true,
        })

        console.log('res', res)
        if (res.hash) {
          return nervos.listeners.listenToTransactionReceipt(res.hash)
        } else {
          throw new Error('No Transaction Hash Received')
        }
      })
  }

  loadPic() {
    axios
      .post('http://123.207.75.151:9996/bitrun/api/v1/get_images', {
        images: '1-0-1,1-1-1,1-2-1,2-1-1',
      })
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  checkLoginStatus() {
    bitmonkeyContract.methods
      .checkFirst()
      .call({
        from,
      })
      .then((status) => {
        this.setState({ hasLogin: status })
        console.log('statusOnChain', status)
        if (!status) this.freeMonkey()
      })
      .catch(console.error)
  }

  freeMonkey() {
    bitmonkeyContract.methods
      .freeMonkey()
      .call({
        from,
      })
      .then(
        (arr) => {
          console.log('success')
          console.log(arr)
          this.setState({ hasLogin: true })
          this.loadData()
        }
        // return Promise.all(times.map(time => bitmonkeyContract.methods.get(time).call({ from })))
      )
      // .then(texts => {
      //     this.setState({ texts })
      // })
      .catch(console.error)
  }

  getOnePictures() {
    bitmonkeyContract.methods
      .getOnePictures()
      .call({
        from,
      })
      .then((indexs) => {
        console.log('get pic Wall success')
        console.log(indexs)
        let resultarr = [...new Set(indexs)]
        console.log('resultarr', resultarr)
        for (var i = 1; i < resultarr.length; i++) {
          bitmonkeyContract.methods
            .getPicture(parseInt(resultarr[i]))
            .call({
              from,
            })
            .then((pic) => {
              console.log('getPic', pic)
              if (pic) {
                this.setState({ status: pic })

                var picString = pic[0] + '-' + pic[1] + '-' + pic[2]
                var picArray = this.state.picArray
                picArray.push(picString)
                picArray = [...new Set(picArray)]
                this.setState({ picArray })
                console.log('picArray', this.state.picArray)
              }
              // return Promise.all(times.map(time => bitmonkeyContract.methods.get(time).call({ from })))
            })
        }
      })
      // .then(texts => {
      //     this.setState({ texts })
      // })
      .catch(console.error)
  }

  walkOut() {
    nervos.appchain
      .getBlockNumber()
      .then((current) => {
        const tx = {
          ...transaction,
          validUntilBlock: +current + 88,
        }
        console.log('walkOut---res')
        return bitmonkeyContract.methods.walkOut().send(tx)
      })
      .then(() => {
        bitmonkeyContract.methods
          .getPictureLength()
          .call({
            from,
          })
          .then((picLength) => {
            console.log('picLength---res', picLength)
            bitmonkeyContract.methods
              .getPicture(picLength - 1)
              .call({
                from,
              })
              .then((picArr) => {
                console.log('picArr', picArr)
              })
          })
      })
    var monkey = this.state.monkey
    monkey[3] = 1
    this.setState({ monkey: monkey })
  }

  finalPicture() {
    nervos.appchain
      .getBlockNumber()
      .then((current) => {
        const tx = {
          ...transaction,
          validUntilBlock: +current + 88,
        }
        console.log('comeHome---res')
        return bitmonkeyContract.methods.finalPicture().send(tx)
      })
      .then((pic) => {
        console.log('final pic', pic)
        var picString = '1-1-2'
        var picArray = this.state.picArray
        picArray.push(picString)
        this.setState({ picArray })
        console.log(this.state.picArray)
      })
  }

  reapFruits() {
    var num = 5
    var fruits = this.state.fruits + num
    this.setState({
      fruits: fruits,
      treeFruits: 0,
    })
    console.log(this.state.treeFruits)
  }

  render() {
    return (
      <React.Fragment>
        <Header hasLogin={this.state.hasLogin} onClick={this.freeMonkey.bind(this)} />
        <img className="bg" src={bg} />
        <PicWall data={this.state.picArrayy} />
        <PC data={this.state.Screen} />
        <Bed />
        <Quilt />
        <Tree data={this.state.treeFruits} onClick={this.reapFruits.bind(this)} />

        {/*<Monkey/>*/}

        <Monkey data={this.state.monkeyClass} where={this.state.monkey[3]} />
        {/*<img className="bg_pic" src={frontbg} />*/}
        <img className="bg_frontbg" src={this.state.monkey[3] == 2 ? end : frontbg} />

        <Market data={this.state.marketData} fruits={this.state.fruits} onClick={this.buyProduct.bind(this)} />
        <Bag data={this.state.bag} />
        <Wallet
          fruits={this.state.fruits}
          onClick={() => {
            var monkey = this.state.monkey
            monkey[3] = 2
            this.setState({ monkey: monkey })
          }}
        />
      </React.Fragment>
    )
  }
}

export default Home
