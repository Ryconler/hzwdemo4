import { observer } from 'mobx-react'
import React from 'react'
import Style from './index.module.scss'

type PropsType = {
  prizeList: any[]
  badgeData: any
}

const Pirzes: React.FC<PropsType> = observer(props => {
  const { badgeData, prizeList } = props

  const lookClick = (prize: any) => {
    if (prize.isEntity) {
      location.href = 'https://w.cekid.com/user-center/prize-record?kwtarget=blank'
    } else {
      location.href = 'https://w.cekid.com/public-ticket/coupon/shopping?naviType=4'
    }
  }

  return (
    <div className={Style.prizes}>
      <div className={Style.prizesTitle}>
        <i></i>
        <h2>
          {badgeData.isUnlocked
            ? badgeData.isShared ? '分享成功，分享礼品已发放' : '分享成功可获得以下奖品'
            : '认证成功可获得以下奖品'}
        </h2>
        <i></i>
      </div>
      <div className={Style.prizesContent}>
        <ul className={Style.prizeList}>
          {prizeList.map((prize, index) => (
            <li className={Style.prizeItem} key={index}>
              <img className={Style.prizeImg} src={prize.image} alt="" />
              <div className={Style.prizeInfo}>
                <h3 className={Style.prizeName}>{prize.name}</h3>
                <p className={Style.prizeThreshold}>{prize.desc}</p>
              </div>
              {badgeData.isUnlocked && badgeData.isShared && (
                <button className={Style.prizeButton} onClick={() => { lookClick(prize) }}>去查看</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})

export default Pirzes
