export type sphericalIteratorProps = {
  amount: number
  containerRadius: number
  fn: (
    pos: { x: number, y: number, z: number },
    items_distance: number,
    index: number
  ) => void
}


const calcNumberOfLayers = (R: number, distance: number) =>
  Math.round(R * 2 / distance)
const calcSectionRadius = (R: number, top_offset: number) =>
  Math.sqrt(R ** 2 - (top_offset - R) ** 2)


const sphericalIterator: (props: sphericalIteratorProps) => void = ({
  amount,
  containerRadius,
  fn
}) => {
  const sphere_volume = 4 / 3 * Math.PI * (containerRadius ** 3)
  const items_distance = (sphere_volume / amount) ** (1 / 3)
  const items_random_offset = items_distance / 3
  const number_of_Z_sections = calcNumberOfLayers(containerRadius, items_distance)

  for (let current_Z_section = 0, currentItem = 0; current_Z_section < number_of_Z_sections; current_Z_section++) {
    const current_Z_coord = current_Z_section * items_distance
    const current_Z_section_radius = calcSectionRadius(containerRadius, current_Z_coord)
    const number_of_Y_rows = calcNumberOfLayers(current_Z_section_radius, items_distance)

    for (let current_Y_row = 0; current_Y_row < number_of_Y_rows; current_Y_row++) {
      const current_Y_coord = current_Y_row * items_distance
      const current_Y_row_length = calcSectionRadius(current_Z_section_radius, current_Y_coord)
      const number_of_X_items = calcNumberOfLayers(current_Y_row_length, items_distance)

      for (let current_X_item = 0; current_X_item < number_of_X_items; current_X_item++) {
        const current_X_coord = current_X_item * items_distance

        fn(
          {
            x: current_X_coord - current_Y_row_length     + (Math.random() - .5) * items_random_offset,
            y: current_Y_coord - current_Z_section_radius + (Math.random() - .5) * items_random_offset,
            z: current_Z_coord - containerRadius          + (Math.random() - .5) * items_random_offset
          },
          items_distance,
          currentItem
        )

        currentItem++

        if (currentItem >= amount)
          break
      }
      if (currentItem >= amount)
        break
    }
    if (currentItem >= amount)
      break
  }
}


export default sphericalIterator
