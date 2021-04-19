# Ts2ray

[![NODEJS](https://img.shields.io/badge/Nodejs->=10-green)](https://nodejs.org) [![NPM](https://img.shields.io/badge/npm-orange)](https://www.npmjs.com) [![YARN](https://img.shields.io/badge/yarn-blue)](https://yarnpkg.com) [![TYPESCRIPT](https://img.shields.io/badge/typescript-4.1.3-informational)](https://www.typescriptlang.org/) 

## Introduction

Ts2ray is a v2ray configuration generation package based on typescript.

Unlike the usual manual modification of config.json files to configure v2ray, Ts2ray supports programmatic methods to configure config.json. This will provide you with help in building v2ray automation control scripts and visualization tools.

All configurations of Ts2ray are developed based on the official [v2ray](https://v2ray.com/) documentation.

Of course, Ts2ray still has some shortcomings. If you have better ideas and suggestions, you are welcome to contribute the code.

## Installation

Before installing Ts2ray, make sure that your computer has a nodejs environment configured and npm or yarn package manager installed.

```shell
# npm
npm install ts2ray

# yarn
yarn add ts2ray
```

## Quick Start

### Import v2sub

You need to import v2sub before using it.

```typescript
import { v2sub } from 'ts2ray';
```

### Create a new instance

You need to create a new instance to use v2sub. The V2sub class constructor requires a subscription url to be passed in.

```typescript
let sub = new v2sub('Your v2ray subscription url');
```

V2sub includes two attributes, `url` and `subs`, and a function of `toConfig()`.

When you create a new v2sub instance using the constructor, v2sub automatically acquires the information in the subscription address and stores them as an array in `subs`.

### Export to Config.json

You can use the `toConfig()` function to generate the configuration file needed by v2ray and export it using the `fs` module.

```typescript
sub.toConfig('Your subscription\' name', 'output path');
```

## Further

In most actual development, the `config.json` files generated by `v2sub` by default may not meet the actual needs. Therefore, you may use the `v2ray` module to customize the configuration file.

### Before start

Before you begin, you need to understand the structure of the v2ray configuration.

- [x] log

- [x] api

- [x] dns

- [x] stats

- [x] routing

- [x] policy

- [x] reverse

- [x] inbounds

- [x] outbounds

- [ ] transport

In `v2ray`, we haven't developed the transport module yet, but we'll add it later.

### Import v2ray

```typescript
import { v2ray } from 'ts2ray';
```

### Create a new instance

```typescript
let v = new v2ray();
```

After you create a new instance, you can add a structure to the v2ray object.

### Construct structure

The properties of all structure classes correspond to the properties of the corresponding structures in the v2ray configuration.

**For example :**

> #### LogObject
>
> ```json
> "log": {
>     "access": "/path/to/file",
>     "error": "path/to/file",
>     "loglevel": "loglevel"
> }
> ```
>
> - `access`: string
>
>   Path to access log. If not empty, it must be a legal file path, such as `"/tmp/v2ray/_access.log"`(Linux), or `"C:\\Temp\\v2ray\\_access.log"`(Windows). If empty, V2Ray writes access log to `stdout`.
>
> - `error`: string
>
>   Path to error log. If not empty, it must be a legal file path. If empty, V2Ray writes error log to `stdout`.
>
> - `loglevel`: "debug" | "info" | "warning" | "error" | "none"
>
>   Level of logs to be written. Different log levels indicate different content of logs. Default value is `"warning"`.
>
>   Log levels:
>
>   - `"debug"`: Information for developers only. Also includes all `"info"` logs.
>   - `"info"`: Information for current state of V2Ray. Users don't have to take care of those. Also includes all `"warning"` logs.
>   - `"warning"`: Something wrong with the environment, usually outside of V2Ray, e.g., network breakage. V2Ray still runs, but users may experience some breakages. Also includes all `"error"` logs.
>   - `"error"`: Something severely wrong, that V2Ray can't run at all.
>   - `"none"`: All logging are disabled.
>
> **FROM [v2ray.com](https://v2ray.com)**

In the v2ray configuration file, the log property contains three child attributes: `access`, `error`, `loglevel`. Accordingly, the `log` property in the v2ray class also contains three child attributes of `access`, `error`, `loglevel`, you can initialize the `log` property using the `Log()` function.

Like this :

```typescript
v.Log('access', 'error', 'warning');
```

Most properties are of type string, however,  the construction of inbound, outbound and routing structures need other classes to participate in.

**For example :**

```typescript
import { inbound, outbound, streamSettings } from 'ts2ray';
import { socks_inbound, vmess_outbound } from 'ts2ray';

v.Inbound(new inbound(
    'proxy',
    10080,
    '127.0.0.1',
    'socks',
  	new socks_inbound('noauth')  
));

v.Outbound(new outbound(
    'proxy_out',
    'vmess',
    new vmess_outbound(
        '192.168.1.1',
        10010,
        "32"
    ),
    new streamSettings(
        'tcp',
        'none'
    )
))
```

**For more information on the structure, please see [here](https://1145141919810.wang/ts2ray/docs/Structure.md).**

### Complete generation structure

```typescript
import { v2ray } from 'ts2ray';
import { inbound, outbound, ruleObject, streamSetting } from 'ts2ray';
import { socks_inbound, vmess_outbound } from 'ts2ray';

v.Log('', '', LOGLEVEL.warning);
v.Dns(['119.29.29.29']);

// Inbound() and Outbound() initialization functions can only be used once. To add inbound and outbound, use addInbound() and addOutbound()
v.Inbound(new inbound(
    'proxy',
    10080,
    '0.0.0.0',
    'socks',
    new socks_inbound('noauth')
));
v.addInbound(new inbound(
    'proxy_http',
    10809,
    '0.0.0.0',
    'http',
    new socks_inbound('noauth')
));

v.Outbound(new outbound(
    'proxy_out',
    PROTOCOL.vmess,
    new vmess_outbound(
        '192.168.1.1',
        10010,
        '32'
    ),
    new streamSettings(
        'tcp',
        'none'
    )
));
v.addOutbound(new outbound(
    'direct',
    'freedom',
    null,
    null
));
v.addOutbound(new outbound(
    'block',
    'blackhole',
    null,
    null
));

let routing = v.Routing('IPIfNoMatch');
routing.addRules(new ruleObject(
    [
        "geosite:google",
        "geosite:github",
        "geosite:netflix",
        "domain:gvt1.com",
        "domain:textnow.com",
        "domain:twitch.tv",
    ],
    [
        "91.108.4.0/22",
        "91.108.8.0/22",
        "91.108.12.0/22",
    ],
    null,
    'proxy_http'
));
```

## Thanks

There is nothing for the time being.

> Translate by 腾讯翻译君

