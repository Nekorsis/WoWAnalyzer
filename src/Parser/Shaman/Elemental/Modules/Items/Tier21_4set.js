import React from 'react';
import Analyzer from 'Parser/Core/Analyzer';
import Combatants from 'Parser/Core/Modules/Combatants';
import SPELLS from 'common/SPELLS';
import SpellIcon from 'common/SpellIcon';
import SpellLink from 'common/SpellLink';
import ItemDamageDone from 'Main/ItemDamageDone';

class Tier21_4set extends Analyzer {
  static dependencies = {
    combatants: Combatants,
  };

  extraDmg = 0;

  on_initialized() {
    this.active = this.combatants.selected.hasBuff(SPELLS.ELEMENTAL_SHAMAN_T21_4SET_BUFF.id);
  }

  on_byPlayer_damage(event) {
    if (event.ability.guid === SPELLS.EARTH_SHOCK_OVERLOAD.id || event.ability.guid === SPELLS.FROST_SHOCK_OVERLOAD.id) {
      this.extraDmg += (event.amount + event.absorbed || 0);
    }
  }

  item() {
    return {
      id: `spell-${SPELLS.ELEMENTAL_SHAMAN_T21_4SET_BUFF.id}`,
      icon: <SpellIcon id={SPELLS.ELEMENTAL_SHAMAN_T21_4SET_BUFF.id} />,
      title: <SpellLink id={SPELLS.ELEMENTAL_SHAMAN_T21_4SET_BUFF.id} />,
      result: <ItemDamageDone amount={this.extraDmg} />,
    };
  }
}

export default Tier21_4set;
