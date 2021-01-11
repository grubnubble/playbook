/* @flow */

import React, { useState } from 'react'

import {
  Caption,
  Typeahead,
  User,
} from '../..'

/**
 *
 * @const filterResults
 * @ignore
 * @returns {[Object]} - a custom mapping of objects, minimally containing
 * `value` and `label` among other possible fields
 * @summary - for doc example purposes only
 */

const filterResults = (results) =>
  results.items.map((result) => {
    return {
      name: result.login,
      id: result.id,
    }
  })

/**
 *
 * @const promiseOptions
 * @ignore
 * @returns {Promise} - fetch API data results from Typeahead input text
 * @see - https://react-select.com/home#async
 * @summary - for doc example purposes only
 */

const promiseOptions = (inputValue) =>
  new Promise((resolve) => {
    if (inputValue) {
      fetch(`https://api.github.com/search/users?q=${inputValue}`)
        .then((response) => response.json())
        .then((results) => resolve(filterResults(results)))
    } else {
      resolve([])
    }
  })

const TypeaheadWithPillsAsync = (props) => {
  const [users, setUsers] = useState([])
  const handleOnChange = (value) => setUsers(value)

  return (
    <>
      <If condition={users && users.length > 0}>
        <Caption
            marginBottom="xs"
            text="State (Users)"
            {...props}
        />
        <For
            each="user"
            of={users}
        >
          <User
              align="left"
              key={user.value}
              marginBottom="md"
              name={user.label}
              orientation="horizontal"
              {...props}
          />
        </For>
      </If>
      <Typeahead
          async
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          isMulti
          label="Github Users"
          loadOptions={promiseOptions}
          onChange={handleOnChange}
          placeholder="type the name of a Github user"
          {...props}
      />
    </>
  )
}

export default TypeaheadWithPillsAsync
