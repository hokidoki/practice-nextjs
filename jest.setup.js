import '@testing-library/jest-dom/extend-expect';

jest.mock('@tanstack/react-query', () => ({
    useInfiniteQuery: jest.fn(),
    useMutation : jest.fn(),
    useQuery : jest.fn()
}));