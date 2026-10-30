# F-35B

The F-35B: its flight model, visual model, and the files the simulator serves for that aircraft. It uses the F135 engine package.

The fly app depends on this package and runs its tests. From the `fly` directory, `npm test` includes them.

## Differences from the real aircraft

### Weapon-bay door edges

On the real jet, the forward and aft edges of the weapon-bay doors are serrated: they run in a sawtooth instead of straight across. Photographs of the underside show this.

The serrations reduce radar cross section. A long straight edge or seam can send a strong radar return straight back to a radar that faces it. Breaking that edge into short segments at a few chosen angles sends less of the energy back. Yong's 1998 Naval Postgraduate School thesis, [Radar Cross Section Reduction: Geometric Control of Discontinuities Using Serrated Edges](https://apps.dtic.mil/sti/pdfs/ADA343828.pdf), studies the effect.

The doors in this package are serrated too, but the teeth are a visual fit. No published source gives the tooth count, depth or angles, so they were traced by eye from photographs of an F-35B with its bays open. The [serration method record](docs/proposals/f35b-weapon-bay-door-serrations.md) shows those photographs and how each point was read. The [door fit](docs/proposals/f35b-weapon-bay-door-geometry.md) gives the resulting outlines.

No photograph shows the aft end of an outboard door, so that end repeats the inboard aft pattern. 0SFS does not simulate radar, so the serrations change the look only.

## Community

- [Code of conduct](https://github.com/0SFS/.github/blob/main/CODE_OF_CONDUCT.md)
- [Contributing](https://github.com/0SFS/.github/blob/main/CONTRIBUTING.md)
- [License](LICENSE)
- [Security](https://github.com/0SFS/.github/blob/main/SECURITY.md)
## Mod

This repository is a 0SFS mod. `public/0sfs-mod.json` is the manifest. GitHub Pages serves the `public/` directory at the site root.

Fork the repository, edit the manifest and the files it names, push, then add the GitHub URL in the simulator's Mods tab.

Topics: `0sfs-mod` and `0sfs-aircraft-mod`. [Modding guide](https://github.com/0SFS/docs/blob/main/modding.md).

## Community

- [Code of conduct](https://github.com/0SFS/.github/blob/main/CODE_OF_CONDUCT.md)
- [Contributing](https://github.com/0SFS/.github/blob/main/CONTRIBUTING.md)
- [License](LICENSE)
- [Security](https://github.com/0SFS/.github/blob/main/SECURITY.md)
