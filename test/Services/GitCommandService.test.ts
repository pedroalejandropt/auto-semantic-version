import { GitCommandService } from '../../src/services/GitCommandService';
import { Commit } from '../../src/models/Commit';
import { Tag } from '../../src/models/Tag';
import { cmd } from '../../src/helpers/ExecCommand';
import {describe, expect, test, afterEach, beforeEach, jest, it} from '@jest/globals';

jest.mock('../../src/helpers/ExecCommand');

describe('GitCommandService', () => {
  let gitCommandService : GitCommandService;

  beforeEach(() => {
    gitCommandService = new GitCommandService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getCommits', () => {
    it('should return an array of commits', async () => {
      const mockCmdOutput = 
        `hash|||commit
        &$&hash2|||commit2
        &$&hash3|||commit3`;
      (cmd as jest.Mock).mockImplementation(() => mockCmdOutput);

      const expectedCommits : Commit[] = [
        new Commit('hash', 'commit'),
        new Commit('hash2', 'commit2'),
        new Commit('hash3', 'commit3')
      ];

      const commits = await gitCommandService.getCommits();
      
      expect(commits.length).toEqual(expectedCommits.length);
      expect(cmd).toHaveBeenCalledWith('git log --pretty=format:"&$& %H|||%s"');
    });
  });

  describe('getLastCommit', () => {
    it('should return the last commit', async () => {
      const mockCmdOutput = `hash3|||commit3`;
      (cmd as jest.Mock).mockImplementation(() => mockCmdOutput);

      const expectedCommit = new Commit('hash3', 'commit3');

      const commit = await gitCommandService.getLastCommit();

      expect(commit.Hash).toEqual(expectedCommit.Hash);
      expect(cmd).toHaveBeenCalledWith('git log -1 --pretty=format:"%H|||%s"');
    });
  });

  describe('getTags', () => {
    it('should return an array of tags', async () => {
      let mock = jest.fn(cmd)
      const mockCmdOutput = 'tag1 ||| tag2';
      (cmd as jest.Mock).mockImplementation(() => mockCmdOutput);

      const expectedTags = [
        new Tag('tag1'),
        new Tag('tag2'),
      ];

      const tags = await gitCommandService.getTags();

      expect(tags.length).toEqual(expectedTags.length);
      expect(cmd).toHaveBeenCalledWith(`git tag --list --format=\"%(refname:short)|||\"`);
    });
  });

  describe('getLastTag', () => {
    it('should return the last tag', async () => {
      let mock = jest.fn(cmd)
      const mockCmdOutput = 'tag1\ntag2\n';
      (cmd as jest.Mock).mockImplementation(() => mockCmdOutput);

      const expectedTag = new Tag('tag2');

      const tag = await gitCommandService.getLastTag();

      expect(tag.Label).toEqual(expectedTag.Label);
      expect(cmd).toHaveBeenCalledWith('git tag -l "*[0-9]"');
    });
  });
});
