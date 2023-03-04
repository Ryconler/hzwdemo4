import React from 'react'
import Style from './index.module.scss'
import moment from 'moment'
import { isMiniprogram } from '@/utils/utility'
import qs from 'qs'
import { observer } from 'mobx-react'
import { useStores } from '@/hooks'
import Cookies from 'js-cookie'

type PropsType = {
  activityList: any[]
  cityInfo: any
}

const Activities: React.FC<PropsType> = observer(props => {
  const { heimlich } = useStores()
  const { activityList, cityInfo } = props

  const activityClick = async (activity: any, index: number) => {
    const q = {
      citycode: cityInfo.cityCode,
      isMiniProgram: await isMiniprogram(),
      kwtarget: 'blank'
    }
    location.href = `/interaction-activity/detail/${activity.activityId}?${qs.stringify(q)}`
  }

  const activityMoreClick = () => {
    location.href =
      '/interaction-activity/activitylist?title=海姆立克急救&typeCode=10171140,10171154&type=2&kwtarget=blank'
  }

  const getActivityMoney = (activity: any) => {
    const { isPay, payWay, activitySkuPrice, consIntegral, freqEntertainment } =
      activity
    if (isPay == '0') {
      return <span className={Style.activityMoneyNum}>免费</span>
    } else {
      if (payWay == 1) {
        return (
          <>
            <span className={Style.activityMoneyYen}>¥</span>
            <span className={Style.activityMoneyNum}>
              {activitySkuPrice / 100}
            </span>
          </>
        )
      } else if (payWay == 2) {
        return (
          <span className={Style.activityMoneyNum}>{consIntegral}积分</span>
        )
      } else if (payWay == 3) {
        return (
          <>
            <span className={Style.activityMoneyYen}>¥</span>
            <span className={Style.activityMoneyNum}>
              {activitySkuPrice / 100}或{consIntegral}积分
            </span>
          </>
        )
      } else if (payWay == 4) {
        return (
          <span className={Style.activityMoneyNum}>
            {freqEntertainment}次游乐卡
          </span>
        )
      } else if (payWay == 5) {
        return (
          <>
            <span className={Style.activityMoneyYen}>¥</span>
            <span className={Style.activityMoneyNum}>
              {activitySkuPrice / 100}或{freqEntertainment}次游乐卡
            </span>
          </>
        )
      } else if (payWay == 6) {
        return (
          <span className={Style.activityMoneyNum}>
            {consIntegral}积分或{freqEntertainment}次游乐卡
          </span>
        )
      } else if (payWay == 7) {
        return (
          <>
            <span className={Style.activityMoneyYen}>¥</span>
            <span className={Style.activityMoneyNum}>
              {activitySkuPrice / 100}或{consIntegral}积分或{freqEntertainment}
              次游乐卡
            </span>
          </>
        )
      }
    }
  }

  return (
    <div className={Style.activities}>
      <div className={Style.activitiesTitle}>
        <i></i>
        <h2>海姆立克门店教学</h2>
        <i></i>
      </div>
      <div className={Style.activitiesContent}>
        <ul className={Style.activityList}>
          {activityList.slice(0, 2).map((activity, index) => (
            <li key={index}>
              <div
                className={Style.activityItem}
                onClick={() => {
                  activityClick(activity, index)
                }}
              >
                <img
                  className={Style.activityImg}
                  src={activity.coverPhotoUrl}
                />
                <div className={Style.activityInfo}>
                  <h3 className={Style.activityName}>{activity.storeName}</h3>
                  <p className={Style.activityTime}>
                    {moment(activity.activityTimeStart).format('MM月DD日HH:mm')}
                    ～{moment(activity.activityTimeEnd).format('MM月DD日HH:mm')}
                  </p>
                  <p className={Style.activityDesc}>
                    {activity.signUpCount}人已报名
                    {activity.limitCount > 0 ? `（限${activity.limitCount}人）` : ' 不限人数'}
                    {Number(activity.distance) > 0 && <span className={Style.activityDistance}>{activity.distance}km</span>}
                  </p>
                  <div className={Style.activitySignup}>
                    <div className={Style.activityMoney}>
                      {getActivityMoney(activity)}
                    </div>
                    <button className={Style.activitySignupButton}>
                      去报名
                    </button>
                  </div>
                </div>
              </div>
              {index < activityList.slice(0, 2).length - 1 && (
                <div className={Style.divider}></div>
              )}
            </li>
          ))}
        </ul>
        {activityList.length > 2 && (
          <button
            className={Style.activityMoreButton}
            onClick={activityMoreClick}
          >
            查看更多<i></i>
          </button>
        )}
      </div>
    </div>
  )
})

export default Activities
