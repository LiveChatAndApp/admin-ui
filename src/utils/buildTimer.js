
export const buildTimer = (id, start, timers) => {
  const time = start
  const timer = {
    id: id,
    time: time,
    counter: () => setInterval(() => {
      // console.log(timer.time)
      timer.time = timer.time - 1000
      if (timer.time <= 0) {
        // console.log('<')
        const indexToDelete = timer.timers.findIndex(o => o.id === id)
        clearInterval(timer.instance)
        timer.timers.splice(indexToDelete, 1)
      }
    }, 1000),
    instance: {},
    buildInstance: () => {
      timer.instance = timer.counter()
    },
    timers: timers
  }
  return timer
}

export const buildTimerWithRepeator = (id, start, timers) => {
  const time = start
  const timer = {
    id: id,
    time: time,
    counter: () => setInterval(() => {
      timer.time = timer.time - 1000
      if (timer.time <= 0) {
        const indexToDelete = timer.timers.findIndex(o => o.id === id)
        clearInterval(timer.instance)
        timer.timers.splice(indexToDelete, 1)
      }
    }, 1000),
    instance: {},
    buildInstance: () => {
      timer.instance = timer.counter()
    },
    timers: timers,
    repeat: function() {
      timer.time = start
      timer.instance = timer.counter()
    }
  }
  return timer
}

export const refreshTimerStatus = {
  refreshTimer: {},
  repeatRefresh: false,
  repeatingRefresh: false,
  repeatShifting: false
}

export const refreshTimerReactTo = {
  refreshTime: function(restTime, data) {
    if (restTime === '') {
      data.refreshTimer = {}
    } else {
      data.repeatRefresh = !(restTime <= 0)
      if (data.repeatingRefresh) {
        data.repeatShifting = true
        setTimeout(() => {
          const timer = buildTimerWithRepeator('refresher', data.refreshTime * 1000, [])
          timer.buildInstance()
          data.refreshTimer = timer
          data.repeatShifting = false
        }, data.refreshTimer.time
        )
      }
    }
  },
  refreshTimer: function(refreshTimer, data, callback) {
    if (data.repeatRefresh && refreshTimer.time <= 0) {
      if (!data.repeatShifting) {
        data.refreshTimer.repeat()
      }
      callback()
    } else if (!data.repeatRefresh) {
      data.refreshTimer = {}
    }
  },
  repeatRefresh: function() {
    return
  },
  repeatingRefresh: function() {
    return
  },
  repeatShifting: function() {
    return
  }
}
