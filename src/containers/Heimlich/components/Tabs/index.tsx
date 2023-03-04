import React, { Ref, useEffect, useRef, useState } from 'react'
import { useStores } from '@/hooks'
import Style from './index.module.scss'
import iconBadgeLocked from '@/assets/images/icon_badge_locked.png'
import iconBadgeUnlocked from '@/assets/images/icon_badge_unlocked.png'
import { observer } from 'mobx-react'
import Cookies from 'js-cookie'
import { ensureLogin } from '@/utils/utility'
import { useHistory } from 'react-router'
import { Toast } from 'antd-mobile'

type PropsType = {
  teachVideoConfig: any
  teachImgtxtConfig: any
  badgeData: any
}

const Tabs: React.FC<PropsType> = observer((props) => {
  const { heimlich } = useStores()
  const { teachVideoConfig, teachImgtxtConfig, badgeData } = props

  const [videoPlayed, setVideoPlayed] = useState(false)
  const [videoFullscreenShowed, setVideoFullscreenShowed] = useState(false)
  const [badgeButtonFixed, setBadgeButtonFixed] = useState(false)
  const teachVideo: Ref<HTMLVideoElement> = useRef(null)
  const badgeButton: Ref<HTMLButtonElement> = useRef(null)
  const history = useHistory()

  useEffect(() => {
    window.removeEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleScroll)
  }, [badgeButton])

  const handleScroll = () => {
    /* 答题按钮吸底 */
    if (badgeButton.current) {
      const rect = badgeButton.current.getBoundingClientRect()
      // 移出顶部时，答题按钮吸附在底部
      if (rect.top + rect.height < 0) {
        console.log('badgeButton fixed')
        setBadgeButtonFixed(true)
      } else {
        console.log('badgeButton not fixed')
        setBadgeButtonFixed(false)
      }
    }
  }

  const teachVideoClick = () => {
    setVideoPlayed(true)
    teachVideo.current?.play()
  }

  const teackImgtxtClick = () => {
    if (teachImgtxtConfig.link) {
      location.href = teachImgtxtConfig.link
    }
  }

  const badgeUnlockClick = () => {
    ensureLogin().then(() => {
      history.push('/heimlich/qa')
      // location.href = '/interaction-activity/heimlich/qa'
    })
  }

  const unlockedBadgeClick = () => {
    location.href = '/interaction-activity/heimlich/certify-succ?naviType=4'
  }

  const badgeShareClick = async () => {
    Toast.info('这里模拟在App中拉起分享')
  }

  /* 页面中与页面底部的按钮 */
  const getBadgeButton = (ref: Ref<HTMLButtonElement>) => {
    return badgeData.isUnlocked ? (
      <button
        className={Style.badgeShareButton}
        onClick={badgeShareClick}
        ref={ref}
      >
        <i className={Style.shareIcon}></i>
        技能过硬 炫耀一下
      </button>
    ) : (
      <button
        className={Style.badgeUnlockButton}
        onClick={badgeUnlockClick}
        ref={ref}
      >
        去认证解锁，做合格父母
      </button>
    )
  }

  return (
    <div className={Style.tabs}>
      <div className={Style.tabTitles}>
        <div className={`${Style.tabTitle} ${Style.video}`}>
          <h2>视频学习</h2>
        </div>
        <div
          className={`${Style.tabTitle} ${Style.imgtxt}`}
          onClick={teackImgtxtClick}
        >
          <h2>图文学习</h2>
        </div>
      </div>
      <div className={Style.tabContents}>
        <div className={`${Style.tabContent} ${Style.video}`}>
          <div className={Style.teachVideo}>
            <video
              ref={teachVideo}
              src={teachVideoConfig.video}
              playsInline
              webkit-playsinline="true"
              controls={videoPlayed}
              preload="metadata"
            ></video>
            {!videoPlayed && (
              <div className={Style.cover}>
                <img
                  className={Style.coverImg}
                  src={teachVideoConfig.poster}
                ></img>
                <div className={Style.coverBg}></div>
                <div className={Style.playIcon} onClick={teachVideoClick}></div>
              </div>
            )}
          </div>
          <div className={Style.badgeWrap}>
            {badgeData.isUnlocked ? (
              <div className={Style.badgeImg} onClick={unlockedBadgeClick}>
                <img src={iconBadgeUnlocked} alt="" />
                <label className={Style.unlocked}></label>
              </div>
            ) : (
              <div className={Style.badgeImg}>
                <img src={iconBadgeLocked} alt="" />
                <label className={Style.locked}></label>
              </div>
            )}
            <div className={Style.badgeInfo}>
              {badgeData.isUnlocked && (
                <h3 className={Style.badgeTitle}>您已获得</h3>
              )}
              <h3 className={Style.badgeTitle}>海姆立克救护指导徽章</h3>
              {!badgeData.isUnlocked ? (
                <p className={Style.badgeGetNum}>
                  全国已有<em>{badgeData.totalNum}</em>人解锁
                </p>
              ) : (
                <p className={Style.badgeGetNum}>
                  全国第<em>{badgeData.userRank}</em>位解锁该徽章
                </p>
              )}
              {!badgeData.isUnlocked && (
                <ul className={Style.badgeConditions}>
                  <li className={Style.badgeCondition}>
                    · 在线学习完成考试认证，可解锁
                  </li>
                  <li className={Style.badgeCondition}>
                    · 参加线下门店教学活动，可解锁
                  </li>
                </ul>
              )}
            </div>
          </div>
          {getBadgeButton(badgeButton)}
        </div>
      </div>
      <div className={`${Style.bottom} ${badgeButtonFixed ? Style.fixed : ''}`}>
        {getBadgeButton(null)}
      </div>

      {videoFullscreenShowed && (
        <div
          className={Style.fullScreenVideo}
          onClick={() => {
            setVideoFullscreenShowed(false)
          }}
        >
          <video
            src={teachVideoConfig.video}
            playsInline
            webkit-playsinline="true"
            controls
            autoPlay
            poster={teachVideoConfig.poster}
            controlsList={'nofullscreen'}
            preload="metadata"
          ></video>
        </div>
      )}
    </div>
  )
})

export default Tabs
