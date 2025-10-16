import '@testing-library/jest-dom';

jest.mock(
  'react-router-dom',
  () => ({
    __esModule: true,
    useNavigate: () => jest.fn(),
    useLocation: () => ({ state: {} }),
    MemoryRouter: ({ children }) => children
  }),
  { virtual: true }
);

import '@testing-library/jest-dom';

// Chakra mock that respects `as` and strips non-DOM props
jest.mock('@chakra-ui/react', () => {
  const React = require('react');

  const keepProp = (key) =>
    key === 'children' ||
    key === 'className' ||
    key === 'id' ||
    key === 'style' ||
    key === 'value' ||
    key === 'defaultValue' ||
    key === 'placeholder' ||
    key === 'type' ||
    key === 'name' ||
    key === 'htmlFor' ||
    key === 'onChange' ||
    key === 'onSubmit' ||
    key === 'onClick' ||
    key === 'disabled' ||
    key === 'required' ||
    key === 'min' ||
    key === 'max' ||
    key === 'role' ||
    key.startsWith('data-') ||
    key.startsWith('aria-');

  const cleanProps = (props = {}) =>
    Object.fromEntries(Object.entries(props).filter(([k]) => keepProp(k)));

  const passthrough = (defaultTag) =>
    React.forwardRef((props, ref) => {
      const { as, children, ...rest } = props || {};
      const Tag = as || defaultTag; // ← honor `as` (e.g., 'form')
      const safe = cleanProps(rest); // strip non-DOM props
      return React.createElement(Tag, { ref, ...safe }, children);
    });

  const lib = {
    __esModule: true,
    Box: passthrough('div'),
    VStack: passthrough('div'),
    Input: passthrough('input'),
    Button: passthrough('button'),
    Text: passthrough('p'),
    ChakraProvider: ({ children }) =>
      React.createElement(React.Fragment, null, children)
  };

  // Fallback for any other Chakra component -> generic element honoring `as`
  return new Proxy(lib, {
    get(target, prop) {
      if (prop in target) return target[prop];
      return passthrough('div');
    }
  });
});

jest.mock('@hookform/resolvers/yup', () => ({
  yupResolver: () => (data) => {
    const errors = {};
    if (!data.firstName)
      errors.firstName = { message: 'First name is required' };
    if (!data.email) errors.email = { message: 'Email is required' };
    return { values: data, errors };
  }
}));
