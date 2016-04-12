import React, { Component } from 'react'

import { GET_OPTIONS } from '../actions/actions'
import { RESET_OPTIONS } from '../actions/actions'

export default function(state = [], action) {
    switch (action.type) {
        case GET_OPTIONS:
          if(action.payload.data.info != null) {
              const data = action.payload.data.info
              const option = [{
                  name: data.name + ' [' + data.ticker + ']',
                  id: data.alliance_id,
                  type: 'alliance'
              }]
              return option.concat(state)
          }
          return action.meta.options.concat(state)
        case RESET_OPTIONS:
          return []
    }

    return state
}


