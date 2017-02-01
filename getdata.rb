require 'rest_client'
require 'json'

api = RestClient::Resource.new('http://www.ncdc.noaa.gov/cdo-web/api/v2', headers: { token: ENV['NOAA_TOKEN'] })
puts 'grabbing states'
states = api['/locations?locationcategoryid=ST&sortfield=name&limit=52'].get
data = JSON.parse(states.body)['results'].map do |state|
  puts 'grabbing stations for ' + state['name']
  stations = api["/stations?locationid=#{state['id']}&datasetid=GSOM&datatypeid=TAVG&enddate=1900-01-01&limit=1000"].get
  {
      id: state['id'],
      name: state['name'],
      stations: (JSON.parse(stations)['results'] || []).map do |station|
        {
            id: station['id'],
            name: station['name'],
            lat: station['latitude'],
            lng: station['longitude']
        }
      end
  }
end
puts 'writing stations.json'
File.write('./src/data/stations.json', data.to_json)
puts 'all done!'
