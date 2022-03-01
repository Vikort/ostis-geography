file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (SearchCinemasInTheCityModule SHARED ${SOURCES})

target_include_directories(SearchCinemasInTheCityModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(SearchCinemasInTheCityModule sc-memory)

add_dependencies(SearchCinemasInTheCityModule sc-memory)

sc_codegen(SearchCinemasInTheCityModule ${CMAKE_CURRENT_LIST_DIR})
