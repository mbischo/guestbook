package com.bloomhealthco.guestbook

import grails.rest.*
import org.grails.databinding.BindingFormat

@Resource(uri='/guests', formats=['json'])
class Guest {

    String name
    String company

    @BindingFormat("yyyy-MM-dd'T'hh:mm:ss.S'Z'")
    Date checkinTime

    @BindingFormat("yyyy-MM-dd'T'hh:mm:ss.S'Z'")
    Date checkoutTime
    Employee visitedEmployee

    static constraints = {
        checkoutTime(nullable: true)
    }

    static mapping = {
        visitedEmployee column: 'visiting_id'
    }
}
