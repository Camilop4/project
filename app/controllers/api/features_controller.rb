module Api
    class FeaturesController < ApplicationController
      def index
        puts "Params: #{params.inspect}"
        # Obtener los parámetros de la solicitud
        mag_types = params[:mag_type] || []
        puts "Mag Types: #{mag_types.inspect}"
        page = params[:page]
        per_page = [params[:per_page].to_i, 1000].min
        per_page = 1 if per_page <= 0

        # Filtrar los terremotos según mag_type si se proporciona
        filtered_earthquakes = mag_types.present? ? Earthquake.where(mag_type: mag_types) : Earthquake.all

        # Paginar los resultados utilizando Kaminari
        paginated_earthquakes = filtered_earthquakes.page(page).per(per_page)

        # Construir el JSON de respuesta
        response = {
          data: paginated_earthquakes.map do |earthquake|
            {
              id: earthquake.id,
              type: 'feature',
              attributes: {
                external_id: earthquake.external_id,
                magnitude: earthquake.magnitude,
                place: earthquake.place,
                time: earthquake.time,
                tsunami: earthquake.tsunami,
                mag_type: earthquake.mag_type,
                title: earthquake.title,
                coordinates: {
                  longitude: earthquake.longitude,
                  latitude: earthquake.latitude
                }
              },
              links: {
                external_url: earthquake.url
              }
            }
          end,
          pagination: {
            current_page: paginated_earthquakes.current_page,
            total: paginated_earthquakes.total_count,
            per_page: paginated_earthquakes.limit_value
          }
        }

        @earthquakes = Earthquake.all
        render json: response
      end
    end
end
