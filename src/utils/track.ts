/**
 * 埋点上报
 * @param pageLevelId 
 * @param logType 
 * @param clickId 
 * @param pageParam 
 * @param positionParam 
 * @param positionId 
 */
export const trackLaunch = (
  pageLevelId: string | number,
  logType = 10000,
  clickId: string | number = '',
  pageParam: any = '',
  positionParam: any = '',
  positionId: string | number = ''
) => {
  try {
    window.track &&
      window.track._launch({
        pageLevelId,
        logType,
        clickId,
        positionId,
        pageParam: JSON.stringify(pageParam),
        positionParam: JSON.stringify(positionParam),
      })
  } catch (e) {
    console.log(e)
  }
}
