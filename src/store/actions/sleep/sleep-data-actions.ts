import { getFitbitSleep } from '@actions/api-actions/fitbit-actions'
import { getGarminSleep } from '@actions/api-actions/garmin-actions'
import { readGoogleFitSleep } from '@actions/api-actions/google-fit-actions'
import { getOuraSleep } from '@actions/api-actions/oura-actions'
import { getPolarSleep } from '@actions/api-actions/polar-actions'
import { getWithingsSleep } from '@actions/api-actions/withings-actions'
import { fetchSleepFromHealthKit } from '@actions/sleep/health-kit-actions'
import { getMainSource } from '@selectors/sleep-source-selectors/sleep-source-selectors'
import { AppThunk } from '@typings/redux-actions'
import { SOURCE } from '@typings/state/sleep-source-state'

export const fetchSleepData = (
  startDate: string,
  endDate: string
): AppThunk => async (dispatch, getState) => {
  const source = getMainSource(getState())

  switch (source) {
    case SOURCE.HEALTH_KIT:
      // max range 0 - 30
      dispatch(fetchSleepFromHealthKit(startDate, endDate))
      break
    case SOURCE.GOOGLE_FIT:
      // max range 0 - 30
      dispatch(readGoogleFitSleep(startDate, endDate))
      break
    case SOURCE.FITBIT:
      // max range 0 - 30
      dispatch(getFitbitSleep(startDate, endDate))
      break
    case SOURCE.OURA:
      dispatch(getOuraSleep(startDate, endDate))
      break
    case SOURCE.WITHINGS:
      dispatch(getWithingsSleep(startDate, endDate))
      break
    case SOURCE.GARMIN:
      dispatch(getGarminSleep(startDate, endDate))
      break
    case SOURCE.POLAR:
      dispatch(getPolarSleep(startDate, endDate))
      break

    default:
      break
  }
}
