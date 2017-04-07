import Group from './group.model';

export function getGroupsInfo (req, res) {
  Group.find().exec((err, gruops) => {
    if (err) {
      res.send({code: err.code, error: err})
    } else {
      res.send({code: 1, groups})
    }
  })
}

export function addGroupsByUser (req, res) {
  const name = req.body.name
  const creator = req.body.creator

  const newGroup = new Group({
    name,
    creator
  })

  newGroup.save((err, group) => {

  })
}