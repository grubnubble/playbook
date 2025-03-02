import React from 'react'

import Nav from '../_nav'
import NavItem from '../_item'

const SubtleNav = (props) => {
  return (
    <Nav variant="subtle">
      <NavItem
          link="#"
          text="Overview"
          {...props}
      />
      <NavItem
          active
          link="#"
          text="Albums"
          {...props}
      />
      <NavItem
          link="#"
          text="Similar Artists"
          {...props}
      />
      <NavItem
          link="#"
          text="Events"
          {...props}
      />
      <NavItem
          link="#"
          text="Discography"
          {...props}
      />
      <NavItem
          link="#"
          text="Listeners"
          {...props}
      />
    </Nav>
  )
}

export default SubtleNav
