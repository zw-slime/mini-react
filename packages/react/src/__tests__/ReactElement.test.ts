let React;
let ComponentFn;
describe('ReactElement',() => {
  beforeEach(() => {
    jest.resetModules();
    React = require('react')
    ComponentFn = () => {
      return React.createElement('div')
    }
  })

  it('return a complete element according to spec',() => {
    const element = React.createElement(ComponentFn);
    expect(element.type).toBe(ComponentFn);
    expect(element.key).toBe(null);
    expect(element.ref).toBe(null);
    expect(element.props).toEqual({})
  })

  it('allows a string to be passed as the type',() => {
    const element = React.createElement('div');
    expect(element.type).toBe('div');
    expect(element.key).toBe(null);
    expect(element.ref).toBe(null);
    expect(element.props).toEqual({})
  })

  it('does not reuse the original config object', () => {
    const config = {foo: 1};
    const element = React.createElement(ComponentFn, config);
    expect(element.props.foo).toBe(1);
    config.foo = 2;
    expect(element.props.foo).toBe(1);
  });

  it('extracts key and ref from the config', () => {
    const element = React.createElement(ComponentFn, {
      key: '12',
      ref: '34',
      foo: '56',
    });
    expect(element.type).toBe(ComponentFn);
    expect(element.key).toBe('12');
    expect(element.ref).toBe('34');
    expect(element.props).toEqual({
      foo: '56'});
  });

  it('merges an additional argument onto the children prop', () => {
    const a = 1;
    const element = React.createElement(
      ComponentFn,
      {
        children: 'text'
      },
      a
    );
    expect(element.props.children).toBe(a);
  });
})
