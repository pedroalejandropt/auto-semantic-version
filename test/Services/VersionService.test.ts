import { VersionService } from '../../src/services/VersionService';
import { GitCommandService } from '../../src/services/GitCommandService';
import { Tag } from '../../src/models/Tag';
import { Commit } from '../../src/models/Commit';
import { Version } from '../../src/models/Version';
import { describe, expect, beforeEach, jest, it,test } from '@jest/globals';

describe('VersionService', () => {
  let versionService: VersionService;
  let gitCommandServiceMock: jest.Mocked<GitCommandService>;

  beforeEach(() => {
    gitCommandServiceMock = {
      getLastTag: jest.fn(),
      getLastCommit: jest.fn(),
    } as unknown as jest.Mocked<GitCommandService>;

    versionService = new VersionService();
    versionService._gitCommandService = gitCommandServiceMock;
  });

  it('should increase version correctly for major commit', async () => {
    const mockLastTag = new Tag('v1.2.3');
    const mockLastCommit = new Commit('abcdef', 'major');
    gitCommandServiceMock.getLastTag.mockResolvedValue(mockLastTag);
    gitCommandServiceMock.getLastCommit.mockResolvedValue(mockLastCommit);

    const result = await versionService.buildVersion();

    expect(result.Major).toEqual(new Version(2, 0, 0).Major);
  });

  it('should increase version correctly for minor commit', async () => {
    const mockLastTag = new Tag('v1.2.3');
    const mockLastCommit = new Commit('abcdef', 'minor');
    gitCommandServiceMock.getLastTag.mockResolvedValue(mockLastTag);
    gitCommandServiceMock.getLastCommit.mockResolvedValue(mockLastCommit);

    const result = await versionService.buildVersion();

    expect(result.Minor).toEqual(new Version(1, 3, 0).Minor);
  });

  it('should increase version correctly for patch commit', async () => {
    const mockLastTag = new Tag('v1.2.3');
    const mockLastCommit = new Commit('abcdef', 'patch');
    gitCommandServiceMock.getLastTag.mockResolvedValue(mockLastTag);
    gitCommandServiceMock.getLastCommit.mockResolvedValue(mockLastCommit);

    const result = await versionService.buildVersion();

    expect(result.Patch).toEqual(new Version(1, 2, 4).Patch);
  });

  // Add more test cases as needed

});
