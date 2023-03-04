import { setPageInfo } from '@/utils/utility'
import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import Style from './index.module.scss'
import { useStores } from '@/hooks'
import Tabs from './components/Tabs'
import Prizes from './components/Prizes'
import Activities from './components/Activities'
import Comments from './components/Comments'
import Cookies from 'js-cookie'

const Heimlich: React.FC = observer(() => {
  const { heimlich } = useStores()
  const { cmsData, badgeData, prizeList, activityList, commentList, cityInfo } = heimlich

  useEffect(() => {
    setPageInfo('海姆立克在线学习', true, true)
    heimlich.getLocationInfo().then(async () => {
      await heimlich.getCmsData()
      await heimlich.getBadgeData()
      heimlich.getPrizeList()
      heimlich.getActivityList()
      heimlich.getCommentList()
    })
    window.addEventListener('scroll', handleScroll)
  }, [heimlich])

  const handleScroll = (e: any) => {
    /* 分页加载评论 */
    if (
      document.body.scrollHeight - window.pageYOffset - window.innerHeight <
      100
    ) {
      if (
        !heimlich.commentListQuery.finished &&
        !heimlich.commentListQuery.loading
      ) {
        heimlich.getCommentList()
      }
    }
  }

  return (
    cmsData && (
      <div className={Style.heimlich}>
        <img className={Style.banner} src={cmsData.homeConfig.banner} />
        <img
          className={Style.introduction}
          src={cmsData.homeConfig.introduction}
        />
        {/* 学习tab */}
        <section className={Style.tabs}>
          <Tabs
            teachVideoConfig={cmsData.homeConfig.teachVideo}
            teachImgtxtConfig={cmsData.homeConfig.teachImgtxt}
            badgeData={badgeData}
          ></Tabs>
        </section>
        {/* 认证奖品 */}
        {prizeList.length > 0 && (
          <section className={Style.prizes}>
            <Prizes
              prizeList={prizeList}
              badgeData={badgeData}
            ></Prizes>
          </section>
        )}
        {/* 活动列表 */}
        {activityList.length > 0 && (
          <section className={Style.activities}>
            <Activities
              activityList={activityList}
              cityInfo={cityInfo}
            ></Activities>
          </section>
        )}
        {/* 海姆立克大家说 */}
        {(cmsData.homeConfig.dajiashuo.topicInfo.image || commentList.length > 0) && (
          <section className={Style.comments}>
            <Comments
              topicInfo={cmsData.homeConfig.dajiashuo.topicInfo}
              commentList={commentList}
            ></Comments>
          </section>
        )}
      </div>
    )
  )
})

export default Heimlich
