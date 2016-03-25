import React, { Component } from 'react'
import { Option } from 'belle'

import { GET_OPTIONS } from '../actions/actions'

export default function(state = [], action) {
    switch (action.type) {
        case GET_OPTIONS:
            if(!action.payload.data) return state
            const options = action.payload.data.map(function(object, index) {
              return (
                getObjectLabel(object)
              );
            })
          return options
    }
    return state
}

function getImageUrl(object) {
    let imgUrl = `https://image.eveonline.com/${object.image}`
    if(object.type === 'system') imgUrl = 'http://evemaps.dotlan.net/images/celestials/star_128.png'
    if(object.type === 'region') imgUrl = 'http://evemaps.dotlan.net/images/celestials/lava.png'
    return imgUrl
}

function getObjectLabel(object) {
    let label = object.name
    if(object.type === 'corporation') label += ' - Corporation'
    if(object.type === 'alliance') label += ' - Alliance'
    return label
}

