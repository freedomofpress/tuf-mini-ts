# Storage Backends

This library supports multiple storage backends, depending on the runtime environment:

| Environment           | Backend used              | Notes                                                                    |
| --------------------- | ------------------------- | ------------------------------------------------------------------------ |
| Node.js (CLI / tests) | `FSBackend`               | Writes metadata and targets to disk. Required for TUF conformance.       |
| Browser Extension     | `ExtensionStorageBackend` | Uses the `browser.storage.local` API (Firefox/Chrome extension storage). |
| Browser Web Page      | `LocalStorageBackend`     | Uses `localStorage`, minimal persistent storage.                         |

The client automatically picks the correct backend based on its environment. This keeps the same API across environments while allowing metadata caching in different environments.

---

# Example: CLI Usage

Download [1.root.json](https://tuf-repo-cdn.sigstore.dev/1.root.json) or a newer one and trigger a refresh.

```bash
$ node ./dist/cli.js \
    --metadata-dir /tmp/ \
    --metadata-url https://tuf-repo-cdn.sigstore.dev \
    refresh 1.root.json
```

Example output:

```
[TUF] Fetching https://tuf-repo-cdn.sigstore.dev/2.root.json
[TUF] Fetching https://tuf-repo-cdn.sigstore.dev/3.root.json
[TUF] Fetching https://tuf-repo-cdn.sigstore.dev/4.root.json
[TUF] Fetching https://tuf-repo-cdn.sigstore.dev/5.root.json
[TUF] Fetching https://tuf-repo-cdn.sigstore.dev/6.root.json
[TUF] Fetching https://tuf-repo-cdn.sigstore.dev/7.root.json
[TUF] Fetching https://tuf-repo-cdn.sigstore.dev/8.root.json
[TUF] Fetching https://tuf-repo-cdn.sigstore.dev/9.root.json
[TUF] Fetching https://tuf-repo-cdn.sigstore.dev/10.root.json
[TUF] Fetching https://tuf-repo-cdn.sigstore.dev/11.root.json
KeyId 7247f0dbad85b147e1863bade761243cc785dcb7aa410e7105dd3d2b61a36d2c does not match the expected 0c87432c3bf09fd99189fdc32fa5eaedf4e4a5fac7bab73fa04a2e0fc64af6f5, importing anyway the provided one for proper referencing.
KeyId 7247f0dbad85b147e1863bade761243cc785dcb7aa410e7105dd3d2b61a36d2c does not match the expected 0c87432c3bf09fd99189fdc32fa5eaedf4e4a5fac7bab73fa04a2e0fc64af6f5, importing anyway the provided one for proper referencing.
KeyId 7247f0dbad85b147e1863bade761243cc785dcb7aa410e7105dd3d2b61a36d2c does not match the expected 0c87432c3bf09fd99189fdc32fa5eaedf4e4a5fac7bab73fa04a2e0fc64af6f5, importing anyway the provided one for proper referencing.
[TUF] Fetching https://tuf-repo-cdn.sigstore.dev/12.root.json
[TUF] Fetching https://tuf-repo-cdn.sigstore.dev/13.root.json
[TUF] Fetching https://tuf-repo-cdn.sigstore.dev/14.root.json
[TUF] Fetching https://tuf-repo-cdn.sigstore.dev/timestamp.json
[TUF] Fetching https://tuf-repo-cdn.sigstore.dev/162.snapshot.json
[TUF] Fetching https://tuf-repo-cdn.sigstore.dev/13.targets.json
```

The CLI behavior follows the TUF client specification required by the [tuf-conformance](https://github.com/theupdateframework/tuf-conformance) suite.

# Running the TUF Conformance Test Suite

Requires Python 3.11 and virtualenv.

```bash
git clone https://github.com/theupdateframework/tuf-conformance
cd tuf-conformance
make env/pyvenv.cfg
./env/bin/pytest -v tuf_conformance \
   --entrypoint "/usr/bin/node /tuf-mini-ts/dist/cli.js" \
   --repository-dump-dir /tmp/
```

Current status (example):

```
 =========================================================================================== short test summary info ============================================================================================
FAILED tuf_conformance/test_basic.py::test_metadata_bytes_match - assert b'{"signature..."version":1}}' == b'{\n "signat...n": 1\n }\n} '
FAILED tuf_conformance/test_file_download.py::test_client_downloads_expected_file - assert 1 == 0
FAILED tuf_conformance/test_file_download.py::test_client_downloads_expected_file_in_sub_dir - assert 1 == 0
FAILED tuf_conformance/test_file_download.py::test_repository_substitutes_target_file - assert 1 == 0
FAILED tuf_conformance/test_file_download.py::test_multiple_changes_to_target - assert 1 == 0
FAILED tuf_conformance/test_file_download.py::test_download_with_hash_algorithms[hashes0] - assert 1 == 0
FAILED tuf_conformance/test_file_download.py::test_download_with_hash_algorithms[hashes1] - assert 1 == 0
FAILED tuf_conformance/test_file_download.py::test_download_with_hash_algorithms[hashes2] - assert 1 == 0
FAILED tuf_conformance/test_file_download.py::test_artifact_cache - assert 1 == 0
FAILED tuf_conformance/test_keys.py::test_duplicate_sig_keyids - assert 0 == 1
FAILED tuf_conformance/test_keys.py::test_keytype_and_scheme[rsa/rsassa-pss-sha256] - assert 1 == 0
FAILED tuf_conformance/test_keys.py::test_keytype_and_scheme[ed25519/ed25519] - assert 1 == 0
FAILED tuf_conformance/test_quoting_issues.py::test_unusual_role_name[?] - AssertionError: assert ('%3F', 1) in [('root', 2), ('timestamp', None), ('snapshot', 2), ('targets', 2)]
FAILED tuf_conformance/test_quoting_issues.py::test_unusual_role_name[#] - AssertionError: assert ('%23', 1) in [('root', 2), ('timestamp', None), ('snapshot', 2), ('targets', 2)]
FAILED tuf_conformance/test_quoting_issues.py::test_unusual_role_name[/delegatedrole] - AssertionError: assert ('%2Fdelegatedrole', 1) in [('root', 2), ('timestamp', None), ('snapshot', 2), ('targets', 2)]
FAILED tuf_conformance/test_quoting_issues.py::test_unusual_role_name[../delegatedrole] - AssertionError: assert ('..%2Fdelegatedrole', 1) in [('root', 2), ('timestamp', None), ('snapshot', 2), ('targets', 2)]
FAILED tuf_conformance/test_rollback.py::test_targets_fast_forward_recovery - assert 1 == 0
FAILED tuf_conformance/test_rollback.py::test_new_snapshot_fast_forward_recovery - assert 1 == 0
FAILED tuf_conformance/test_rollback.py::test_new_timestamp_fast_forward_recovery - assert 1 == 0
FAILED tuf_conformance/test_static_repositories.py::test_static_repository[tuf-on-ci-0.11] - assert 1 == 0
FAILED tuf_conformance/test_static_repositories.py::test_static_repository[sigstore-root-signing] - assert 1 == 0
FAILED tuf_conformance/test_updater_delegation_graphs.py::test_graph_traversal[basic-delegation] - AssertionError: assert [] == [('A', 1)]
FAILED tuf_conformance/test_updater_delegation_graphs.py::test_graph_traversal[single-level-delegations] - AssertionError: assert [] == [('A', 1), ('B', 1)]
FAILED tuf_conformance/test_updater_delegation_graphs.py::test_graph_traversal[two-level-delegations] - AssertionError: assert [] == [('A', 1), ('B', 1), ('C', 1)]
FAILED tuf_conformance/test_updater_delegation_graphs.py::test_graph_traversal[two-level-test-DFS-order-of-traversal] - AssertionError: assert [] == [('A', 1), ('... 1), ('B', 1)]
FAILED tuf_conformance/test_updater_delegation_graphs.py::test_graph_traversal[three-level-delegation-test-DFS-order-of-traversal] - AssertionError: assert [] == [('A', 1), ('... 1), ('B', 1)]
FAILED tuf_conformance/test_updater_delegation_graphs.py::test_graph_traversal[two-level-terminating-ignores-all-but-roles-descendants] - AssertionError: assert [] == [('A', 1), ('C', 1)]
FAILED tuf_conformance/test_updater_delegation_graphs.py::test_graph_traversal[three-level-terminating-ignores-all-but-roles-descendants] - AssertionError: assert [] == [('A', 1), ('C', 1), ('D', 1)]
FAILED tuf_conformance/test_updater_delegation_graphs.py::test_graph_traversal[two-level-ignores-all-branches-not-matching-paths] - AssertionError: assert [] == [('B', 1)]
FAILED tuf_conformance/test_updater_delegation_graphs.py::test_graph_traversal[three-level-ignores-all-branches-not-matching-paths] - AssertionError: assert [] == [('A', 1), ('B', 1)]
FAILED tuf_conformance/test_updater_delegation_graphs.py::test_graph_traversal[cyclic-graph] - AssertionError: assert [] == [('A', 1), ('... 1), ('D', 1)]
FAILED tuf_conformance/test_updater_delegation_graphs.py::test_graph_traversal[two-roles-delegating-to-a-third] - AssertionError: assert [] == [('A', 1), ('C', 1), ('B', 1)]
FAILED tuf_conformance/test_updater_delegation_graphs.py::test_graph_traversal[two-roles-delegating-to-a-third-different-paths] - AssertionError: assert [] == [('A', 1), ('B', 1), ('C', 1)]
FAILED tuf_conformance/test_updater_delegation_graphs.py::test_targetfile_search[no delegations] - assert 1 == 0
FAILED tuf_conformance/test_updater_delegation_graphs.py::test_targetfile_search[targetpath matches wildcard] - assert 1 == 0
FAILED tuf_conformance/test_updater_delegation_graphs.py::test_targetfile_search[targetpath with separators x] - assert 1 == 0
FAILED tuf_conformance/test_updater_delegation_graphs.py::test_targetfile_search[targetpath with separators y] - assert 1 == 0
FAILED tuf_conformance/test_updater_delegation_graphs.py::test_targetfile_search[targetpath is not delegated by all roles in the chain] - AssertionError: assert [] == [('B', 1)]
======================================================================================== 38 failed, 70 passed in 36.93s ========================================================================================
```

## TODO

These are the next improvements needed to reach full conformance:

* [ ] Write metadata to disk as-is

  Currently JSON is re-serialized, which breaks `test_metadata_bytes_match`.
  Instead, persist the original downloaded bytes.

* [ ] Support delegated roles

  Implement delegated target traversal (DFS as per TUF §5.7).

* [ ] Generalize target fetching logic

  Right now the logic is simplified for Sigstore (`trusted_root.json`).
  Replace with generic TUF behavior.

* [ ] Improve hash algorithm support

  SHA-256 works; SHA-512 and multiple hashes per target need enabling.

* [ ] Debug RSA / Ed25519 verification paths

  Code exists, but needs testing against the conformance suite.

---

If you plan to run the conformance suite regularly, you can mark known failures as expected using `xfail` files as described here:
[https://github.com/theupdateframework/tuf-conformance/blob/main/docs/usage.md#xfail](https://github.com/theupdateframework/tuf-conformance/blob/main/docs/usage.md#xfail)