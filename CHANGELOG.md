# Changelog
All notable changes to this project will be documented in this file.

## [1.0.3] - 2019-**-**
### Add
- Application now is using Context API.
- Info page
- Add sharing npcs between users
- Add change owner button for admins
- Add Comments

### Changed
- Rerwited components to use Hooks functions.
- Authentication now require login and passport to application.

## [1.0.2] - 2019-02-20
### Fix
- AppContext auth initial value.
- CharacterContext url host.

### Removed
- moment package.
- classnames package.

## [1.0.2] - 2019-02-20
### Added
- Readme.md
- Changelog.md

### Removed
- Useless redux packages.

## [1.0.1] - 2019-02-20
### Changed
- Situations when button "Dodaj Postać" is showed to user.
- Disabled default(red) theme colors.
- Add required prop to name input in AddNPC and EditNPC component.

### Fixed
- Image preview card width in AddNPC and EditNPC component.

## [1.0.0] - 2019-02-16
### Added
- AppContext and CharacterContext.
- Simple authorization to unlock Add/Edit/Delete functions.
- Add Login route component.
- Add Public and Authenticated component.

### Changed
- Rewrite Navigation component.
- Rewrite NpcCard component.
- Rewrite AddNPC component.
- Rewrite EditNPC component.
- Rewrite Home component.
- Rewrite App component.

## [0.9.0] - 2019-02-15
### Added
- Routes components Home, AddNPC and EditNPC.
- App Navigation bar.
- Add/Read/Edit/Delete npc functions.
- Theme system with random theme colors on app start.