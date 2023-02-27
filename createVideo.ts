import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: 'v2023-02-15'})

client
  .createOrReplace({
    _id: 'f593568e-b1f2-4bbf-8021-615f5be88470',
    _type: 'person',
    name: 'Nina Aarvik',
  })
  .then(() => {
    client.createOrReplace({
      _id: 'a33a5ec6-67e6-4389-af95-ccaa3f3529aa',
      _type: 'video',
      description:
        'Do you know what a product is? After this video, you sure will.',
      slug: {
        _type: 'slug',
        current: 'sanity-connect-ad',
      },
      srtFile: {
        _type: 'file',
        // "asset": {
        //   "_ref": "file-0523c9f4a1cd534c5bf5cbf259feca5dcb2ac754-srt",
        //   "_type": "reference"
        // }
      },
      title: 'Sanity Connect Ad',
      transcribedMuxVideo: {
        _type: 'transcribedMuxVideo',
        transcript: [
          {
            _key: 'IHasRoox83A3NzRMiQEft',
            speaker: {
              _ref: 'f593568e-b1f2-4bbf-8021-615f5be88470',
              _type: 'reference',
            },
            text: 'Products are all different.',
            timeRange: {
              start: '00:00:09,200',
              stop: '00:00:10,480',
            },
          },
          {
            _key: 'Ki9bH_mrkjHl4XYeVA9EB',
            speaker: {
              _ref: 'f593568e-b1f2-4bbf-8021-615f5be88470',
              _type: 'reference',
            },
            text: 'Your products are different.',
            timeRange: {
              start: '00:00:10,480',
              stop: '00:00:11,680',
            },
          },
          {
            _key: 'ZE0qbgb37ZbYFLkP_ESQn',
            speaker: {
              _ref: 'f593568e-b1f2-4bbf-8021-615f5be88470',
              _type: 'reference',
            },
            text: "So why do we keep presenting \nthem, as if they're all the same?",
            timeRange: {
              start: '00:00:11,680',
              stop: '00:00:14,160',
            },
          },
          {
            _key: 'blRbgKZk6YzZqIZoovpe9',
            speaker: {
              _ref: 'f593568e-b1f2-4bbf-8021-615f5be88470',
              _type: 'reference',
            },
            text: 'Like…  who designed it? How was it made?',
            timeRange: {
              start: '00:00:18,480',
              stop: '00:00:20,800',
            },
          },
          {
            _key: 'CO2W0N0UewIZxJw0rQonl',
            speaker: {
              _ref: 'f593568e-b1f2-4bbf-8021-615f5be88470',
              _type: 'reference',
            },
            text: 'Your products should know the \ndetails of what makes them special.',
            timeRange: {
              start: '00:00:14,160',
              stop: '00:00:16,880',
            },
          },
          {
            _key: 'vj2R70fpyPKepqk563yzd',
            speaker: {
              _ref: 'f593568e-b1f2-4bbf-8021-615f5be88470',
              _type: 'reference',
            },
            text: 'And let them tell your story.',
            timeRange: {
              start: '00:00:16,880',
              stop: '00:00:18,480',
            },
          },
          {
            _key: '1jyvioI2opxrkWhUuhQOE',
            speaker: {
              _ref: 'f593568e-b1f2-4bbf-8021-615f5be88470',
              _type: 'reference',
            },
            text: 'This is a product.',
            timeRange: {
              start: '00:00:00,720',
              stop: '00:00:01,840',
            },
          },
          {
            _key: 'zNZTruLdKHjY8vhfpJ2DW',
            speaker: {
              _ref: 'f593568e-b1f2-4bbf-8021-615f5be88470',
              _type: 'reference',
            },
            text: 'This is a product.',
            timeRange: {
              start: '00:00:01,840',
              stop: '00:00:02,880',
            },
          },
          {
            _key: 'AowUExkWLe37-ciVuQuha',
            speaker: {
              _ref: 'f593568e-b1f2-4bbf-8021-615f5be88470',
              _type: 'reference',
            },
            text: 'This is a product.',
            timeRange: {
              start: '00:00:02,880',
              stop: '00:00:03,840',
            },
          },
          {
            _key: 'JP9yjROdZcKR35XOLJrl_',
            speaker: {
              _ref: 'f593568e-b1f2-4bbf-8021-615f5be88470',
              _type: 'reference',
            },
            text: 'This is a product.',
            timeRange: {
              start: '00:00:03,840',
              stop: '00:00:04,880',
            },
          },
          {
            _key: 'QBTWzYXkbyzngvI4dqkNS',
            speaker: {
              _ref: 'f593568e-b1f2-4bbf-8021-615f5be88470',
              _type: 'reference',
            },
            text: 'Also a product.',
            timeRange: {
              start: '00:00:04,880',
              stop: '00:00:05,920',
            },
          },
          {
            _key: 'qkGOSI3QN4u2VuuaFVk6M',
            speaker: {
              _ref: 'f593568e-b1f2-4bbf-8021-615f5be88470',
              _type: 'reference',
            },
            text: 'A product.',
            timeRange: {
              start: '00:00:05,920',
              stop: '00:00:06,640',
            },
          },
          {
            _key: 'Ht53yLqdkC44RlhyZciVE',
            speaker: {
              _ref: 'f593568e-b1f2-4bbf-8021-615f5be88470',
              _type: 'reference',
            },
            text: 'Another product.',
            timeRange: {
              start: '00:00:06,640',
              stop: '00:00:07,600',
            },
          },
          {
            _key: 'XLDJHbWTkFQ_qhlZ764S-',
            speaker: {
              _ref: 'f593568e-b1f2-4bbf-8021-615f5be88470',
              _type: 'reference',
            },
            text: 'And yet another product.',
            timeRange: {
              start: '00:00:07,600',
              stop: '00:00:09,200',
            },
          },
          {
            _key: 'j7_f1OOTIOA9PxIjvZNjM',
            speaker: {
              _ref: 'f593568e-b1f2-4bbf-8021-615f5be88470',
              _type: 'reference',
            },
            text: 'Your values, a voice that \nconnects with your audience.',
            timeRange: {
              start: '00:00:20,800',
              stop: '00:00:23,840',
            },
          },
          {
            _key: '1qlazhYkJ8ZBsoXbgCYSI',
            speaker: {
              _ref: 'f593568e-b1f2-4bbf-8021-615f5be88470',
              _type: 'reference',
            },
            text: 'Bring in your team, work together,',
            timeRange: {
              start: '00:00:23,840',
              stop: '00:00:25,760',
            },
          },
          {
            _key: 'eodBzmmc4f8Wy22pVTFkF',
            speaker: {
              _ref: 'f593568e-b1f2-4bbf-8021-615f5be88470',
              _type: 'reference',
            },
            text: 'and use this living structure of content \nto create a story that tells stories.',
            timeRange: {
              start: '00:00:25,760',
              stop: '00:00:30,080',
            },
          },
          {
            _key: 'IgNeIw4X5NZ6KkgBoApSw',
            speaker: {
              _ref: 'f593568e-b1f2-4bbf-8021-615f5be88470',
              _type: 'reference',
            },
            text: 'In a way that makes sense in this moment, \nwith your product. To your audience. And',
            timeRange: {
              start: '00:00:30,080',
              stop: '00:00:34,560',
            },
          },
          {
            _key: 'm08tbM9sLJHLZoenES7Hd',
            speaker: {
              _ref: 'f593568e-b1f2-4bbf-8021-615f5be88470',
              _type: 'reference',
            },
            text: 'for your brand. Stand out and connect, using \nthe Shopify you know with the power of Sanity.',
            timeRange: {
              start: '00:00:34,560',
              stop: '00:00:40,720',
            },
          },
          {
            _key: 'LZZXiIasFyAPlJgmipUWr',
            speaker: {
              _ref: 'f593568e-b1f2-4bbf-8021-615f5be88470',
              _type: 'reference',
            },
            text: 'Create remarkable experience that move your \naudience and your product using Sanity Connect.',
            timeRange: {
              start: '00:00:40,720',
              stop: '00:00:47,280',
            },
          },
          {
            _key: 'b0ra0llubjg',
            _type: 'timestamp',
            text: 'A final item',
            timeRange: {
              start: '00:00:48,500',
              stop: '00:00:49,00',
            },
          },
          {
            _key: '77925dee61a54522a219e35c8325247a',
            text: ' This is a product, this is a product, this is a product, this is a product, also a product, a product, another product, and yet another product.',
            timeRange: {
              start: '00:00:00',
              stop: '00:00:09',
            },
          },
          {
            _key: 'ab4d05145dd240a0a8129ef4a7e894ad',
            text: " Products are all different. Your products are different. So why do we keep presenting them as if they're all the same?",
            timeRange: {
              start: '00:00:09',
              stop: '00:00:14',
            },
          },
          {
            _key: 'aacd19c839344626be94ec5dda0a2fff',
            text: ' Your products should know the details of what makes them special and let them tell your stories.',
            timeRange: {
              start: '00:00:14',
              stop: '00:00:18',
            },
          },
          {
            _key: '85bc029902d44774a7bbdf0f2e7cd289',
            text: ' Like, who designed it? How was it made? Your values? A voice that connects with your audience.',
            timeRange: {
              start: '00:00:18',
              stop: '00:00:24',
            },
          },
          {
            _key: 'cacd4d686b134bf89f585c2df915a3ee',
            text: ' Bring in your team, work together, and use this living structure of content to create a story that tells stories in a way that makes sense in this moment with your products, to your audience, and for your brand.',
            timeRange: {
              start: '00:00:24',
              stop: '00:00:36',
            },
          },
          {
            _key: 'be9a16a18692498b99b08834d5b4cea0',
            text: ' Stand out and connect using the Shopify you know with the power of sanity.',
            timeRange: {
              start: '00:00:36',
              stop: '00:00:41',
            },
          },
          {
            _key: '94de8399e15c43b1834109ccdc574b37',
            text: ' Create remarkable experiences that move your audience and your product using Sanity Connect.',
            timeRange: {
              start: '00:00:41',
              stop: '00:00:57',
            },
          },
        ],
        // "video": {
        //   "_type": "mux.video",
        //   "asset": {
        //     "_ref": "a95bb12e-b346-4bc3-b8c6-f2721ec87606",
        //     "_type": "reference",
        //     "_weak": true
        //   }
        // }
      },
    })
  })
