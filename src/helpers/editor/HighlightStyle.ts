import {Ref} from "vue";
import {AppEnvironnement} from "src/models/model";
import {Decoration, MatchDecorator, ViewPlugin} from "@codemirror/view";
import {ENV_REGEXT} from "src/composables/parseEnv";

export const environmentHighlightStyle = (
  aggregateEnvs: Ref<AppEnvironnement | null>
) => {
  const decorator = getMatchDecorator(aggregateEnvs)

  return ViewPlugin.define(
    (view) => ({
      decorations: decorator.createDeco(view),
      update(u) {
        this.decorations = decorator.updateDeco(u, this.decorations)
      },
    }),
    {
      decorations: (v) => v.decorations,
    }
  )
}

const getMatchDecorator = (aggregateEnvs: Ref<AppEnvironnement | null>) =>
  new MatchDecorator({
    regexp: ENV_REGEXT,
    decoration: (m) => {
      return checkEnv(m[0], aggregateEnvs);
    },
  });

function checkEnv(env: string, aggregateEnvs: Ref<AppEnvironnement | null>) {
  const className = aggregateEnvs.value?.values.find(
    (k: {entry: { key: string }}) => {
      return k.entry.key === env.slice(2, -2);
    }
  )
    ? 'environnement-found'
    : 'environnement-not-found'
  return Decoration.mark({
    class: `cursor-help transition rounded px-1 focus:outline-none mx-0.5 env-highlight ${className}`,
  })
}
