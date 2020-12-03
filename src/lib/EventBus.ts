type EventName = string

interface EventFn {
  (payload: any): void
}

interface Events {
  [key: string]: EventFn[]
}

export class EventBus {
  #events: Events

  /**
   * Events bus to store events and emit them when will be triggered
   *
   * @param events - initial events' array
   */
  constructor(events: Events = {}) {
    this.#events = events
  }

  /**
   * Subscribe event
   *
   * @param name
   * @param fn
   */
  on(name: EventName, fn: EventFn) {
    // Create events' array if not yet created
    if (!(name in this.#events)) {
      this.#events[name] = []
    }

    // Push function to array
    this.#events[name].push(fn)

    // Provide off (unsubscribe) function to remove event
    return () => {
      const index = this.#events[name].findIndex((value) => value === fn)
      this.#events[name].splice(index, 1)
    }
  }

  /**
   * Fire all events stored as `name` in events' array
   *
   * @param name
   * @param payload
   */
  emit(name: EventName, payload?: any) {
    if (!(name in this.#events)) {
      this.#events[name].forEach((fn) => fn(payload))
    }
  }
}
