import { createSelector } from 'reselect'

const selectDirectiory = state=> state.directory;

export const selectDirectorySection = createSelector(
    [selectDirectiory],
    directory => directory.sections
)